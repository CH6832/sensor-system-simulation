# Project Requirements

This document outlines the system requirements for the **Sensor System Simulation** project. It includes both technical and functional requirements for the backend, frontend, and database components. Additionally, an ASCII diagram of the system architecture is provided for visual clarity.

---

## 1. **Functional Requirements**

### 1.1 **Backend API**
- The backend should expose a RESTful API to handle sensor data.
- The API should allow for **POST** requests to insert new sensor data.
- The API should allow for **GET** requests to retrieve all sensor data.
- The system should handle multiple sensor types, including **GasSensor**, **TemperatureSensor**, **HumiditySensor**, and **RadiationSensor**.

### 1.2 **Frontend Interface**
- The frontend should display sensor data in a responsive and user-friendly table.
- The frontend should fetch sensor data from the backend API and display it dynamically.
- The frontend should be styled using **Bootstrap** for a modern and clean interface.
  
### 1.3 **Data Storage**
- The system should store sensor data in a **MongoDB** database.
- Each entry should include the following fields:
  - `sensorType` (e.g., GasSensor, TemperatureSensor)
  - `value` (the sensor reading)
  - `timestamp` (when the data was recorded)

---

## 2. **Non-Functional Requirements**

### 2.1 **Performance**
- The backend should be able to handle at least **1000 requests per second** for sensor data submissions and retrieval.
- Sensor data should be stored and retrieved in real-time.

### 2.2 **Scalability**
- The backend should be designed to scale horizontally by adding more instances if needed.
- The system should be capable of integrating new sensor types without major code changes.

### 2.3 **Security**
- Sensitive data must be protected using secure connections (e.g., HTTPS).
- Future enhancements should include user authentication for secure access to sensor data.

---

## 3. **System Requirements**

### 3.1 **Software Requirements**

#### 3.1.1 **Backend**
- **Node.js** (v14.x or higher) – For running the backend server.
- **Express.js** – For building the REST API.
- **MongoDB** – NoSQL database for storing sensor data.
- **CORS** – Should be configured properly for cross-origin requests.

#### 3.1.2 **Frontend**
- **HTML5** – Structure of the webpage.
- **CSS3** – Styling, including **Bootstrap 4/5** for responsiveness.
- **JavaScript** – For handling dynamic updates of sensor data on the page.

#### 3.1.3 **Development Tools**
- **npm** (Node Package Manager) – For managing backend dependencies.
- **http-server** – For serving static files (frontend).

---

## 4. **Database Schema**

### 4.1 **Sensor Data Table Schema**

The `SensorData` table will have the following structure:

| Field       | Type     | Description                                  |
|-------------|----------|----------------------------------------------|
| `id`        | ObjectId | Unique identifier for each sensor entry.     |
| `sensorType`| String   | Type of the sensor (e.g., GasSensor).        |
| `value`     | Number   | The sensor reading value.                    |
| `timestamp` | String   | The timestamp when the data was recorded.    |

---

## 5. **System Architecture Diagram (ASCII)**

Here is an ASCII diagram that represents the architecture of the system. This diagram shows the flow of data from the sensors to the backend server, to the database, and finally to the frontend for display.

```
                          +----------------------------+
                          |      Sensor Devices (C++)  |
                          |   (GasSensor, Temperature, |
                          |    Humidity, Radiation)    |
                          +----------------------------+
                                     |
                                     v
                         +-----------------------------+
                         |    Backend Server (Node.js) |
                         |      - API (Express)        |
                         |      - MongoDB (Database)   |
                         +-----------------------------+
                                     |
                                     v
                         +-----------------------------+
                         |   MongoDB Database (Sensor  |
                         |        Data Storage)        |
                         +-----------------------------+
                                     |
                                     v
                     +-----------------------------------+
                     |      Frontend (HTML + JavaScript) |
                     |    - Bootstrap Styled Table       |
                     |    - Dynamic Data Visualization   |
                     +-----------------------------------+
                                     |
                                     v
                           +-------------------------+
                           |    Web Browser (User)   |
                           |    - Displays Sensor     |
                           |      Data in Table       |
                           +-------------------------+
```

### Diagram Explanation:

1. **Sensor Devices**: Sensors collect data (e.g., GasSensor, TemperatureSensor, HumiditySensor, RadiationSensor) and send it to the backend server via the API.
   
2. **Backend Server (Node.js)**: The server exposes RESTful endpoints to receive sensor data (via POST requests) and retrieve it (via GET requests). The backend interacts with the MongoDB database for data storage.

3. **MongoDB Database**: A NoSQL database used to store the sensor data. Each record in the database includes the sensor type, value, and timestamp.

4. **Frontend**: The frontend consists of HTML and JavaScript, fetching data from the backend and displaying it in a dynamic, responsive table. It uses Bootstrap for modern styling.

5. **Web Browser (User)**: The user accesses the system via a web browser and interacts with the displayed data.

---

## 6. **Usage Example**

### 6.1 **Submitting Sensor Data (Using cURL)**

```bash
curl -X POST http://localhost:3000/sensor-data -H "Content-Type: application/json" -d "{\"sensorType\": \"GasSensor\", \"value\": 0.45}"
```

**Response:**

```json
{
  "message": "Sensor data added with ID: 6742e7d82370261cc37c2b0d"
}
```

### 6.2 **Retrieving Sensor Data (Using cURL)**

```bash
curl -X GET http://localhost:3000/sensor-data
```

**Response:**

```json
[
  {
    "sensorType": "GasSensor",
    "value": 0.45,
    "timestamp": "2024-11-24T12:00:00Z"
  },
  {
    "sensorType": "HumiditySensor",
    "value": 60.3,
    "timestamp": "2024-11-24T12:05:00Z"
  },
  {
    "sensorType": "RadiationSensor",
    "value": 0.75,
    "timestamp": "2024-11-24T12:10:00Z"
  },
  {
    "sensorType": "TemperatureSensor",
    "value": 24.0,
    "timestamp": "2024-11-24T12:15:00Z"
  }
]
```

---

## 7. **Conclusion**

This project provides a robust and scalable solution for simulating sensor data collection, storing it in a MongoDB database, and presenting it through a modern web interface. The system is designed to be extensible, allowing easy addition of new sensor types and features in the future.

By following the requirements and setup instructions outlined in this document, you will be able to implement, run, and interact with the sensor data simulation successfully.

---

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
