const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const certificateRoutes = require("./routes/certificateRoutes");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fci-rover-verification.vercel.app",
    ],
  })
);
app.use(express.json());
app.use("/api/certificates", certificateRoutes);

app.get("/", (req, res) => {
  res.send("FCI Rover Certificate Verification Server Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});