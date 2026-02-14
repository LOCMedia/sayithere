// Netlify Function: generate-supportive-response
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { content, mood } = JSON.parse(event.body);

    if (!content) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Content is required' }),
      };
    }

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: `You are a compassionate, gentle listener on SayItHere, an anonymous support platform. Someone has shared their feelings with you. Your role is to provide a brief, warm, validating response that makes them feel heard without trying to fix them or give advice.

Current mood: ${mood || 'not specified'}

What they shared:
"${content}"

Respond with 2-3 sentences that:
- Validate their feelings without judgment
- Acknowledge their courage in sharing
- Offer gentle reassurance
- Use a warm, natural tone (like talking to a close friend)
- DON'T give advice or try to fix anything
- DON'T be overly formal or clinical
- DON'T ask questions

Keep it under 60 words. Be genuine and human.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', response.status, errorText);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.content[0].text;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response: aiResponse }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to generate response',
        details: error.message,
      }),
    };
  }
};