import DOT_ENV from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRoute from "./route/userRoute.js";

DOT_ENV.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({ error: "helloo" });
});

app.use("/users", userRoute);

const PORT = process.env.PORT || 5000;
const ENV = process.env.ENV;
const DB_URI = process.env.DB_URI;
const PORT_ADDRESS =
  ENV === "DEV" ? `http://localhost:${PORT}` : `http://localhost:${PORT}`;

const init = async () => {
  await connectDB(DB_URI);
  app.listen(PORT, () => {
    console.log(`Server is listening on: ${PORT_ADDRESS}`);
  });
};

init();
