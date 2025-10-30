import express from 'express';
import userRouter from './router/user/index.js';
import messageRouter from './router/message/index.js';
import fileRouter from './router/file/index.js';
import config from './config/index.js'
import activityRouter from './router/activity/index.js'
import intergalRouter from './router/intergal/index.js'
import productRouter from './router/product/index.js'

import DiscussionRouter from './router/discussion/index.js'
const app = express();
app.use(express.json());
app.use('/file', fileRouter);
app.use('/activity', activityRouter);
app.use('/product', productRouter);
app.use('/intergal', intergalRouter);
app.use('/discussion', DiscussionRouter);
app.use('/user', userRouter);
app.use('/message', messageRouter);
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
