import express from "express";
const app = express();
const PORT = 3000;
// app.use(express.json());

import bodyParser from "body-parser";
app.use(bodyParser.json());

import cors from "cors";
app.use(cors());

import { Pool } from "pg";

const db = new Pool({
  host: "aws-0-ap-south-1.pooler.supabase.com",
  database: "postgres",
  user: "postgres.urbioihiapdgckfetbfe",
  password: "ojms;droigjxd;noir hjnx;fotihu;bt9uh;odfitjnh;lx;jobth",
  port: 5432
})

app.get("/api/v1/rainfall", async (req, res) => {
  const url = "https://data.tmd.go.th/api/ThailandMonthlyRainfall/v1/index.php?uid=api&ukey=api12345&format=json"
  const response = await fetch(url)
  // console.log(await response.json())
  const json = await response.json()
  res.status(200).json(json.StationMonthlyRainfall)
})

app.get("/api/v1/rainfall/:stationId", async (req, res) => {
  const { stationId } = req.params;
  const url = "https://data.tmd.go.th/api/ThailandMonthlyRainfall/v1/index.php?uid=api&ukey=api12345&format=json"
  const response = await fetch(url)
  // console.log(await response.json())
  const json = await response.json()

  const stationData = json.StationMonthlyRainfall.find(sta =>
    sta.WmoStationNumber === stationId);

  res.status(200).json(stationData)
})

// app.get("/api/v1/rainfall/:stationId", async (req, res) => {
//   const { stationId } = req.params;
//   const url = "https://data.tmd.go.th/api/ThailandMonthlyRainfall/v1/index.php?uid=api&ukey=api12345&format=json"
//   const response = await fetch(url);
//   const json = await response.json();
//   const stationData = json.StationMonthlyRainfall.find(sta =>
//     sta.WmoStationNumber === stationId);
//   res.status(200).json({
//     data: stationData
//   });
// });


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);

});
