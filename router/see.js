const express = require('express');
const router = express.Router();

// 存储所有连接的客户端
let clients = [];

/**
 * @desc SSE 长连接路由
 * GET /sse/events?userId=xxx
 */
router.get('/events', (req, res) => {
  const userId = req.query.userId;
  console.log(`✅ 用户 ${userId} 建立 SSE 连接`);

  // 设置 SSE 头
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 保存客户端
  const client = { id: userId, res };
  clients.push(client);
  console.log(`当前连接用户: ${clients.map(c => c.id).join(', ')}`);

  // 断开时清理
  req.on('close', () => {
    console.log(`❌ 用户 ${userId} 断开连接`);
    clients = clients.filter(c => c.id !== userId);
  });
});

/**
 * @desc 推送给指定用户
 * POST /sse/send
 */
router.post('/send', (req, res) => {
  const { userId, message } = req.body;
  console.log(`📩 推送给用户 ${userId}: ${message}`);

  const client = clients.find(c => c.id === userId);
  if (client) {
    client.res.write(`data: ${JSON.stringify({ message })}\n\n`);
    res.json({ success: true, msg: '消息已推送' });
  } else {
    res.status(404).json({ success: false, msg: '用户不在线' });
  }
});

/**
 * @desc 广播给所有用户
 * POST /sse/broadcast
 */
router.post('/broadcast', (req, res) => {
  const { message } = req.body;
  console.log(`📢 广播消息: ${message}`);

  clients.forEach(client => {
    client.res.write(`data: ${JSON.stringify({ message })}\n\n`);
  });

  res.json({ success: true, msg: '消息已广播' });
});

module.exports = router;
