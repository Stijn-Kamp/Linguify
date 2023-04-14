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

export default { translateText };