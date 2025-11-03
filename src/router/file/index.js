
import express from 'express';
import path from 'path';
import multi from 'multiparty';
import fs from 'fs';

const router = express.Router();
const uploadDir = path.resolve(process.cwd(), 'upload');
const fileDir = path.resolve(uploadDir, 'file');
router.post('/upload', (req, res) => {
  const form = new multi.Form();
 console.log('uploadDir:', uploadDir);
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(400).send('Error parsing form');
    }

    console.log('Fields:', fields);
    console.log('Files:', files);

    try {
      const hash = fields.hash[0];      // 文件总 hash
      const chunk = fields.chunkHash[0];    // 当前分片编号
      const hashChunkDir = path.resolve(uploadDir, hash);

      // 确保目录存在
      if (!fs.existsSync(hashChunkDir)) {
        fs.mkdirSync(hashChunkDir, { recursive: true });
      }

      const filePath = path.resolve(hashChunkDir, chunk);

     if(!fs.existsSync(filePath)){
         fs.renameSync(files.file[0].path, filePath);
     }
     else {
      res.send({message:'ok'})
     }
      res.send({ code: 0, message: 'Chunk uploaded successfully' });
    } catch (err) {
      console.error('Error saving chunk:', err);
      res.status(500).send('Error saving chunk');
    }
  });
});

router.post('/verity',async (req,res)=>{
    const {fileName} = req.body;
    const filepath =path.resolve(fileDir, fileName);
    if(fs.existsSync(filepath)){
        return res.json({ code: 400, message: '文件已存在' });
    }
    else {
      res.json({ code: 200, message: '文件不存在' });
    }
})
router.post('/merge', async (req, res) => {
    const { hash, fileName } = req.body;
    const hashChunkDir = path.resolve(uploadDir, hash);
    const finalFilePath = path.resolve(fileDir, fileName);

    if (fs.existsSync(finalFilePath)) {
        return res.json({ code: 200, message: '文件已存在' });
    }

    const chunkFiles = fs.readdirSync(hashChunkDir).sort(); 

    const writeStream = fs.createWriteStream(finalFilePath);

    for (const chunk of chunkFiles) {
        const chunkPath = path.resolve(hashChunkDir, chunk);
        await new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(chunkPath);
            readStream.pipe(writeStream, { end: false });  //pipe是异步的
            readStream.on('end', () => {
                fs.unlinkSync(chunkPath); // 写完就删
                resolve();
            });
            readStream.on('error', reject);
        });
    }

    writeStream.end(); // 所有分片写完后关闭流

    res.json({ code: 0, message: '文件合并完成' });
});


export default router;