import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

if (!process.env.OPENAI_API_KEY) {
  console.warn('WARNING: OPENAI_API_KEY is not set. Set it in the environment before starting the server.');
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Missing `message` in request body' });

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error('OpenAI API Error:', JSON.stringify(data, null, 2));
      // Extract readable error message with better parsing
      let errorMsg = 'Unknown error';
      if (data.error) {
        if (typeof data.error === 'string') {
          errorMsg = data.error;
        } else if (data.error.message) {
          errorMsg = data.error.message;
        } else if (data.error.code) {
          errorMsg = data.error.code;
        } else {
          errorMsg = JSON.stringify(data.error);
        }
      }
      return res.status(resp.status).json({ error: errorMsg });
    }

    const reply = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : '';
    res.json({ reply });
  } catch (err) {
    console.error('Error in /api/chat', err);
    res.status(500).json({ error: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Chat proxy server listening on http://localhost:${PORT}`);
});
