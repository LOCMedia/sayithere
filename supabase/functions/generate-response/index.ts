import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  try {
    const { mood } = await req.json();

    const prompt = `
You are a calm, empathetic listener inside a venting app.

The user selected the mood: "${mood}"

Respond with a short, emotionally supportive message.
Rules:
- Be warm, human, and grounding
- Maximum 3 sentences
- No advice
- No diagnosis
- No clichés
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: prompt }
        ],
        max_tokens: 80,
      }),
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content;

    return new Response(
      JSON.stringify({ message }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ message: null }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
});
