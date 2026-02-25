exports.handler = async function(event) {
  const { name, mood, memory } = JSON.parse(event.body);

  const prompt = `
Write a heartfelt ${mood} love letter.
Partner name: ${name}
Memory reference: ${memory || "No specific memory provided"}
Keep it emotional, natural, and not too long.
  `;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a romantic Indian love letter writer." },
          { role: "user", content: prompt }
        ],
        temperature: 0.9
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        letter: data.choices[0].message.content
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong." })
    };
  }
};