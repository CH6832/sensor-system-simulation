const express = require('express');
const bodyParser = require('body-parser');
const { saveSensorData, getStatistics, getLatestData } = require('./database');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/sensor-data', (req, res) => {
    const { temperature, humidity, gas, radiation } = req.body;
    saveSensorData(temperature, humidity, gas, radiation);
    res.sendStatus(200);
});

app.get('/sensor-data', (req, res) => {
    getLatestData((data) => {
        res.json(data);
    });
});

app.get('/statistics', (req, res) => {
    getStatistics((stats) => {
        res.json(stats);
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
