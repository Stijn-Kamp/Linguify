import express from 'express';
import openaiFunctions from './openaiFunctions.js';

const app = express()
const port = 5000

// https://stackoverflow.com/questions/70009299/http-server-respnd-with-an-output-from-an-async-function
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

// test GET request
app.get('/test', async (req, res) => {
    const text = 'hello world';
    const to = 'Dutch';
    const translatedText = await openaiFunctions.translateText(text, to);
    res.send(translatedText);
})

app.get('/translate', async (req, res) => {
    const text = req.query.text;
    const to = req.query.to;
    const translatedText = await openaiFunctions.translateText(text, to); 
    res.send(translatedText);
})
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

console.log('Node.js web server at port 5000 is running..')
