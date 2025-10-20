// index.js
import { ZhipuAI } from "zhipuai-sdk-nodejs-v4";
// 初始化客户端
const client = new ZhipuAI({
  apiKey: '4f3ba9f1d42d40d698ab85d093fea114.FfIgOm7Rr0Eobrna', // 请提前在环境变量里设置你的 API Key
});

const AiChat =(content)=>{
    return new Promise ((resolve,reject)=>{
        client.createCompletions({
            model: "glm-4", 
            messages: [
              {
                role: "user",
                content: content,
              },
            ],
            stream: false,
          }).then((response) => {
            resolve(response.choices[0].message.content);
          }).catch((error) => {
            reject(error);
          });
    })
}
export default AiChat