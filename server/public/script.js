async function fetchStatistics() {
    try {
        const response = await fetch('/api/statistics');
        const stats = await response.json();
        const statsDiv = document.getElementById('statistics');
        statsDiv.innerHTML = `<pre>${JSON.stringify(stats, null, 2)}</pre>`;
    } catch (error) {
        console.error('Error fetching statistics:', error);
    }
}

fetchStatistics();
