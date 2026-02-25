
const OpenAI = require("openai");

exports.handler = async function(event) {
  try {
    const { name, mood, memory } = JSON.parse(event.body);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
Write a heartfelt ${mood} love letter.
Partner name: ${name}
Memory reference: ${memory || "No specific memory provided"}
Keep it emotional, natural, and not too long.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a romantic Indian love letter writer." },
        { role: "user", content: prompt }
      ],
      temperature: 0.9,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        letter: completion.choices[0].message.content
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};