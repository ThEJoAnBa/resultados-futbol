export default async function handler(req, res) {
  try {
    const apiKey = process.env.API_FOOTBALL_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Falta configurar API_FOOTBALL_KEY"
      });
    }

    const hoy = new Date();

const fechaLocal =
  hoy.getFullYear() + "-" +
  String(hoy.getMonth() + 1).padStart(2, "0") + "-" +
  String(hoy.getDate()).padStart(2, "0");

const fecha = req.query.date || fechaLocal;

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
