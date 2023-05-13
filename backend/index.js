import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})

const configuration = new Configuration({
    organization: "", 
    apiKey: "",
});

const openai = new OpenAIApi(configuration);
app.post("/", async(req, res)=>{
    const { chats } = req.body;
    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a EbereGPT. You can help with graphic design tasks",
          },
          ...chats,
        ]
    })
    res.json({
        output: result.data.choices[0].message,
    })
})