export default async function handler(req, res) {
  // 1. Full CORS Access Headers Set Karein
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { number } = req.query;

  if (!number) {
    return res.status(400).json({ error: 'Number required' });
  }

  try {
    // 2. Server-side API Call (Browser block nahi karega)
    const response = await fetch(`https://api.cnic.pro/?num=${number}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    if (!response.ok) {
      throw new Error('External API Failed');
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: 'Backend fetch issue' });
  }
}
