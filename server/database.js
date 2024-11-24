const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database setup
const dbPath = path.join(__dirname, 'data', 'sensorData.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS SensorData (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sensorType TEXT NOT NULL,
        value REAL NOT NULL,
        timestamp TEXT NOT NULL
    )
`);

// Save sensor data
exports.saveSensorData = (sensorType, value, timestamp) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO SensorData (sensorType, value, timestamp) VALUES (?, ?, ?)`;
        db.run(query, [sensorType, value, timestamp], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
};

// Get statistics
exports.getStatistics = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT sensorType, AVG(value) AS average, MAX(value) AS max, MIN(value) AS min FROM SensorData GROUP BY sensorType`;
        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};
