const express = require("express");
const path = require('path');
const { MongoClient } = require("mongodb");
const app = express();

const url = "mongodb://localhost:27017"; // MongoDB connection URL
const dbName = "sensor_system"; // Database name

const client = new MongoClient(url);

// Connect to MongoDB
async function connectToDb() {
    try {
        await client.connect();
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Exit if the connection fails
    }
}

// Middleware to parse JSON bodies
app.use(express.json()); // Automatically parses incoming JSON
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to catch errors in request body parsing
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        console.error("Invalid JSON: ", err);
        return res.status(400).send({ error: "Invalid JSON format." });
    }
    next();
});

// MongoDB Collection
const db = client.db(dbName);
const sensorReadingsCollection = db.collection("sensor_readings");

// Route to add sensor data
app.post("/sensor-data", async (req, res) => {
    const { sensorType, value } = req.body;

    if (!sensorType || !value) {
        return res.status(400).send({ error: "Missing sensorType or value" });
    }

    try {
        const result = await sensorReadingsCollection.insertOne({
            sensorType,
            value,
            timestamp: new Date(),
        });

        res.status(201).send({ message: `Sensor data added with ID: ${result.insertedId}` });
    } catch (error) {
        console.error("Error inserting sensor data:", error);
        res.status(500).send({ error: "Error inserting sensor data." });
    }
});

// Route to get sensor data
app.get("/sensor-data", async (req, res) => {
    try {
        const data = await sensorReadingsCollection.find().toArray();
        res.json(data);
    } catch (error) {
        console.error("Error retrieving sensor data:", error);
        res.status(500).send({ error: "Error retrieving sensor data." });
    }
});

// Start the Express server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Connect to MongoDB
connectToDb();
