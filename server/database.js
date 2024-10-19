const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/sensorData.db');

// Create table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS sensor_data (
        id INTEGER PRIMARY KEY,
        temperature REAL,
        humidity REAL,
        gas REAL,
        radiation REAL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

function saveSensorData(temperature, humidity, gas, radiation) {
    db.run(
        `INSERT INTO sensor_data (temperature, humidity, gas, radiation) VALUES (?, ?, ?, ?)`,
        [temperature, humidity, gas, radiation]
    );
}

function getLatestData(callback) {
    db.get(`SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 1`, [], (err, row) => {
        if (err) throw err;
        callback(row);
    });
}

function getStatistics(callback) {
    db.get(
        `SELECT MIN(temperature) as minTemp, MAX(temperature) as maxTemp, AVG(temperature) as avgTemp,
                MIN(humidity) as minHum, MAX(humidity) as maxHum, AVG(humidity) as avgHum,
                MIN(gas) as minGas, MAX(gas) as maxGas, AVG(gas) as avgGas,
                MIN(radiation) as minRad, MAX(radiation) as maxRad, AVG(radiation) as avgRad
         FROM sensor_data`,
        [],
        (err, row) => {
            if (err) throw err;
            callback(row);
        }
    );
}

module.exports = { saveSensorData, getStatistics, getLatestData };
