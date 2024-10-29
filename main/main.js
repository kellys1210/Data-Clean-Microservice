import express from "express";
import cors from "cors";
import axios from "axios";
import fs from "fs/promises";

const app = express();

app.use(express.json());
app.use(cors());

const router = express.Router();

const filePath = "../cat_data.json";

router.get("/cat-data", async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const parsedData = JSON.parse(data);
    res.status(200).json(parsedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }

  //   try {
  //     const cleanedData = axios.get("http://localhost:5004");
  //     console.log({ cleanedData });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: error.message });
  //   }
});

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

