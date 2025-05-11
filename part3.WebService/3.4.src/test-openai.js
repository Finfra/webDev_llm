require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "안녕! 넌 누구야?" }],
    model: "gpt-3.5-turbo"
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();

