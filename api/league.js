export default async function handler(req, res) {
  try {
    const apiKey = process.env.API_FOOTBALL_KEY;
    const { league, season } = req.query;

    if (!apiKey) {
      return res.status(500).json({
        error: "Falta configurar API_FOOTBALL_KEY"
      });
    }

    if (!league) {
      return res.status(400).json({
        error: "Falta el ID de la competición"
      });
    }

    const temporada = season || new Date().getFullYear();

    const response = await fetch(
      `https://v3.football.api-sports.io/standings?league=${league}&season=${temporada}`,
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
