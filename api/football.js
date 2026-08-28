export default async function handler(req, res) {
  try {
    const apiKey = process.env.API_FOOTBALL_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Falta configurar API_FOOTBALL_KEY"
      });
    }

    const fecha = req.query.date || new Date().toISOString().split("T")[0];

    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?date=" + fecha,
      {
        headers: {
          "x-apisports-key": apiKey
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
