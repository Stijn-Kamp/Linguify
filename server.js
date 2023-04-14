import http from 'http'; // 1 - Import Node.js core module
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";

dotenv.config()

// https://github.com/openai/openai-node#readme
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

async function sendOpenAIprompt(prompt) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
      });
    return completion.data.choices[0].text;
}

async function translateText(text, to) {
    const prompt = `Translate the following text to ${to}:
    ${text}
    `;
    return await sendOpenAIprompt(prompt);
}

// https://stackoverflow.com/questions/70009299/http-server-respnd-with-an-output-from-an-async-function
var server = http.createServer(async function (req, res) {   //create web server
    if (req.url == '/') { //check the URL of the current request
        
        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // set response content    
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    
    }
    else if (req.url == "/student") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is student Page.</p></body></html>');
        res.end();
    
    }
    else if (req.url == "/admin") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is admin Page.</p></body></html>');
        res.end();
    
    }    
    else if (req.url == "/translate") {
        const translation = await translateText("Hello world", "Dutch");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(translation);
        res.end();
    
    }
    else
        res.end('Invalid Request!');
});

server.listen(5000); //3 - listen for any incoming requests
console.log('Node.js web server at port 5000 is running..')
