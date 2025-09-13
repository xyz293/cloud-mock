const express = require('express');
const cors = require('cors')
const app = express();
const config = require('./config/default');
app.use(express.json());
app.use(cors());
const comment = require('./router/course_comment');
const user = require('./router/user');
const college = require('./router/college');
const course = require('./router/course');
const course_content = require('./router/course_content');
const information = require('./router/information');
app.use('/user',user);
app.use('/course',course);
app.use('/comment',comment);
app.use('/course_content',course_content);
app.use('/college',college);
app.use('/information',information);
app.listen(config.port,()=>{
    console.log('服务器启动成功');
})
