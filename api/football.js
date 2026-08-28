export default async function handler(req, res) {
  try {
    const apiKey = process.env.FOOTBALLDATA_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Falta configurar FOOTBALLDATA_API_KEY en Vercel."
      });
    }

    const { date } = req.query;

    const fecha = date || new Date().toISOString().split("T")[0];

    const response = await fetch(
      `https://api.football-data.io/v1/matches?date=${fecha}`,
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: error.message
    });
  }
}
