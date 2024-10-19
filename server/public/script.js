const dataContainer = document.getElementById('data-container');
const statsContainer = document.getElementById('stats-container');

function fetchLatestData() {
    fetch('/sensor-data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('temperature').textContent = data.temperature.toFixed(2);
            document.getElementById('humidity').textContent = data.humidity.toFixed(2);
            document.getElementById('gas').textContent = data.gas.toFixed(2);
            document.getElementById('radiation').textContent = data.radiation.toFixed(2);
        });
}

function fetchStatistics() {
    fetch('/statistics')
        .then(response => response.json())
        .then(stats => {
            statsContainer.innerHTML = `
                <p>Temperature: Min: ${stats.minTemp.toFixed(2)} °C, Max: ${stats.maxTemp.toFixed(2)} °C, Avg: ${stats.avgTemp.toFixed(2)} °C</p>
                <p>Humidity: Min: ${stats.minHum.toFixed(2)} %, Max: ${stats.maxHum.toFixed(2)} %, Avg: ${stats.avgHum.toFixed(2)} %</p>
                <p>Gas Level: Min: ${stats.minGas.toFixed(2)} ppm, Max: ${stats.maxGas.toFixed(2)} ppm, Avg: ${stats.avgGas.toFixed(2)} ppm</p>
                <p>Radiation: Min: ${stats.minRad.toFixed(2)} µSv/h, Max: ${stats.maxRad.toFixed(2)} µSv/h, Avg: ${stats.avgRad.toFixed(2)} µSv/h</p>
            `;
        });
}

setInterval(() => {
    fetchLatestData();
    fetchStatistics();
}, 60000);  // Update every minute
