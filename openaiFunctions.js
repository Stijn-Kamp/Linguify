import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";

dotenv.config()

// https://github.com/openai/openai-node#readme
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

async function sendOpenAIprompt(prompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  }).then((res) => {return res.data.choices[0].text})
  .catch((error) => {console.log(error); return ""})
  return response;
}

async function translateText(text, to) {
    const prompt = `Translate the following text to ${to}:
    ${text}
    `;
    var translatedText = await sendOpenAIprompt(prompt)
    .then((data) => {return data})
    .catch((error) => {
      console.log(error);
    return ""});
    return translatedText;
}

export default { translateText };