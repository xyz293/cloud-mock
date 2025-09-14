const express = require('express');
const multer = require('multer');
const redis = require('redis');
const fs = require('fs-extra');
const path = require('path');

const router = express.Router();

// === 配置 ===
const UPLOAD_DIR = path.join(__dirname, '../uploads'); // 所有上传文件存放根目录
const TMP_DIR = path.join(UPLOAD_DIR, 'tmp');          // 分片临时目录
const FINAL_DIR = path.join(UPLOAD_DIR, 'files');      // 最终文件目录

// 创建目录
fs.ensureDirSync(TMP_DIR);
fs.ensureDirSync(FINAL_DIR);

// Redis 客户端
const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: 6380,
});

redisClient.on('error', (err) => {
  console.error('Redis 错误:', err);
});

redisClient.connect().catch(console.error);

// === Multer 配置：接收分片文件 ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { hash } = req.body; // ✅ hash 代替 fileId
    const dir = path.join(TMP_DIR, hash);
    fs.ensureDirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const { index } = req.body;
    cb(null, `chunk_${index}.bin`);
  }
});

const upload = multer({ storage });

// === 接收分片：POST /api/upload/chunk ===
router.post('/chunk', upload.single('file'), async (req, res) => {
  try {
    const { hash, index, totalChunks } = req.body;

    if (!hash || !/^[a-f0-9]{32}$/.test(hash)) {
      return res.status(400).json({
        code: 400,
        message: '无效的 hash：必须是 32 位小写 MD5 哈希值'
      });
    }

    if (index === undefined || totalChunks === undefined) {
      return res.status(400).json({
        code: 400,
        message: '缺少必要参数：index, totalChunks'
      });
    }

    // 记录当前分片已上传
    await redisClient.sAdd(`uploaded_chunks:${hash}`, index);

    console.log(`✅ 分片 ${index}/${totalChunks} 上传成功，hash: ${hash}`);
    res.json({ code: 200, message: '分片上传成功' });
  } catch (err) {
    console.error('上传分片失败:', err);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
});

// === 查询已上传分片：GET /api/upload/check ===
router.get('/check', async (req, res) => {
  const { hash } = req.query;

  if (!hash || !/^[a-f0-9]{32}$/.test(hash)) {
    return res.status(400).json({ code: 400, message: '无效的 hash 参数' });
  }

  const uploaded = await redisClient.sMembers(`uploaded_chunks:${hash}`);
  const indices = uploaded.map(Number).sort((a, b) => a - b);

  res.json({ code: 200, indices });
});

// === 合并文件：POST /api/upload/merge ===
router.post('/merge', async (req, res) => {
  try {
    console.log('收到合并请求:', req.body); // 打印参数

    const { hash, fileName } = req.body;
    const totalChunks = Number(req.body.totalChunks); // 转数字

    if (!hash || !/^[a-f0-9]{32}$/.test(hash)) {
      console.error('❌ hash 不合法:', hash);
      return res.status(400).json({ code: 400, message: '无效的 hash' });
    }

    if (!fileName || isNaN(totalChunks)) {
      console.error('❌ 参数缺失:', { fileName, totalChunks });
      return res.status(400).json({ code: 400, message: '缺少必要参数' });
    }

    const tmpDir = path.join(TMP_DIR, hash);
    console.log('临时目录:', tmpDir);

    const finalPath = path.join(FINAL_DIR, fileName);
    console.log('目标文件路径:', finalPath);

    // 检查分片
    for (let i = 0; i < totalChunks; i++) {
      const chunkPath = path.join(tmpDir, `chunk_${i}.bin`);
      const exists = await fs.pathExists(chunkPath);
      if (!exists) {
        console.error(`❌ 分片缺失: ${chunkPath}`);
        return res.status(400).json({ code: 400, message: `第 ${i} 片未上传` });
      }
    }

    // 拼接文件
    const writeStream = fs.createWriteStream(finalPath);
    for (let i = 0; i < totalChunks; i++) {
      const chunkPath = path.join(tmpDir, `chunk_${i}.bin`);
      const readStream = fs.createReadStream(chunkPath);
      await new Promise((resolve, reject) => {
        readStream.pipe(writeStream, { end: false });
        readStream.on('end', resolve);
        readStream.on('error', reject);
      });
    }
    writeStream.end();

    await fs.remove(tmpDir);
    await redisClient.del(`uploaded_chunks:${hash}`);

    console.log(`🎉 文件合并完成：${finalPath}`);
    res.json({ code: 200, message: '文件合并成功', data: `/files/${fileName}` });
  } catch (err) {
    console.error('合并失败:', err);
    res.status(500).json({ code: 500, message: err.message || '合并失败，请重试' });
  }
});


module.exports = router;
