import express from 'express';
import userRouter from './router/user/index.js';
import messageRouter from './router/message/index.js';
import fileRouter from './router/file/index.js';
import config from './config/index.js'
const app = express();
app.use(express.json());
app.use('/file', fileRouter);

app.use('/user', userRouter);
app.use('/message', messageRouter);
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
