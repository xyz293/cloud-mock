const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const config = require('./config/default');

// 中间件：解析 JSON 请求体（支持大文件）
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 允许跨域
app.use(cors());

// 路由导入
const comment = require('./router/course_comment');
const user = require('./router/user');
const department = require('./router/department');
const job = require('./router/job');
const application = require('./router/application');
const college = require('./router/college');
const patent = require('./router/patent');
const course = require('./router/course');
const course_content = require('./router/course_content');
const information = require('./router/information');
const university = require('./router/university');
const company = require('./router/company');
const upload = require('./router/upload'); // 👈 你的分片上传路由
const expert = require('./router/expert');
const student = require('./router/student');

// 挂载所有业务路由
app.use('/user', user);
app.use('/course', course);
app.use('/department', department);
app.use('/expert', expert);
app.use('/upload', upload); // 👈 这里是 /api/upload/chunk 等接口
app.use('/student', student);
app.use('/job', job);
app.use('/patent', patent);
app.use('/application', application);
app.use('/university', university);
app.use('/company', company);
app.use('/comment', comment);
app.use('/course_content', course_content);
app.use('/college', college);
app.use('/information', information);

// ✅ 关键：挂载静态文件服务 —— 让前端可通过 URL 直接访问合并后的文件
// 假设你的合并后文件存放在：./uploads/files/xxx.mp4
// 那么访问 http://localhost:端口/files/xxx.mp4 即可下载
app.use('/files', express.static(path.join(__dirname, 'uploads/files')));

// 启动服务器
app.listen(config.port, () => {
  console.log('✅ 服务器启动成功');
  console.log('🌐 端口号为：' + config.port);
  console.log('💾 数据库连接成功');
  console.log('📁 文件下载地址：http://localhost:' + config.port + '/files/你的文件名.mp4');
});