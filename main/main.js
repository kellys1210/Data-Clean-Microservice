import express from "express";
import cors from "cors";
import fs from "fs/promises";
import fetch from "node-fetch";

const app = express();

app.use(express.json());
app.use(cors());

const router = express.Router();

const filePath = "../cat_data.json";

router.get("/cat-data", async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    res.status(200).json(parsedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

async function getCleanCatData() {
  try {
    const response = await fetch("http://localhost:5004");
    const cleanedCatData = await response.json();
    const stringData = JSON.stringify(cleanedCatData, null, 2);
    console.log(stringData);
  } catch (error) {
    console.error(error);
  }
}

getCleanCatData();

app.use("/", router);

const PORT = 5001;

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Unable to connect to server: ${error.message}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

// source venv/bin/activate
// python3 data_clean.py
