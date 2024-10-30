import express from "express";
import cors from "cors";
import fs from "fs/promises";
import fetch from "node-fetch";

const app = express();

app.use(express.json());
app.use(cors());

const router = express.Router();

app.use("/", router);

const filePath = "../cat_data.json";

// GET method, will be called by Clean Data microservice.
router.get("/cat-data", async (_, res) => {
  try {
    // Opens JSON file containing data (in your program, this is where you'll make the call to your database instead)
    const data = await fs.readFile(filePath, "utf8");

    // Parses received data, sends data as response to the microservice.
    const parsedData = JSON.parse(data);
    console.log(`This is the data being sent to your microservice... ${data}`);
    res.status(200).send(parsedData);

    // Error handling
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// INITIATES MICROSERVICE COMMUNICATION: 
// Sends request to fetch data from the microservice on port 5004.
// When the microservice receives the request, it will send a request here to obtain the data.
// Once data is cleaned, this method will receive it as a response.
async function getCleanCatData() {
  try {
    // Fetches data from the local server where microservice is hosted. Once received, saves it to cleanedCatData.
    const response = await fetch("http://localhost:5004");
    const cleanedCatData = await response.json();

    // Converts cleanedCatData to JSON string format.
    const stringData = JSON.stringify(cleanedCatData, null, 2);
    console.log(
      `This is the data received back from microservice... ${stringData}`
    );

    // Error handling.
  } catch (error) {
    console.error(error);
  }
}

// Calls microservice to clean data.
getCleanCatData();

// Defines main program local server port as 5001
const PORT = 5001;

// Mounts main program onto port 5001
app.listen(PORT, (error) => {
  if (error) {
    console.error(`Unable to connect to server: ${error.message}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

// source venv/bin/activate
// python3 data_clean.py
