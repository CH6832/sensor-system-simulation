# **Sensor Simulation System**

This project simulates real-world sensor data and sends it to a Node.js server, which stores the data and provides a user interface to display real-time sensor measurements and statistics. The system can simulate a range of sensors, including temperature, humidity, dangerous gases, and radiation.

## **Table of Contents**

- [**Sensor Simulation System**](#sensor-simulation-system)
  - [**Table of Contents**](#table-of-contents)
  - [**Overview**](#overview)
  - [**Technologies**](#technologies)
  - [**Features**](#features)
  - [**Project Structure**](#project-structure)
  - [**Setup and Installation**](#setup-and-installation)
    - [**C++ Simulation Setup**](#c-simulation-setup)
    - [**Node.js Server Setup**](#nodejs-server-setup)
  - [**How to Run**](#how-to-run)
    - [**Running the C++ Simulation**](#running-the-c-simulation)
    - [**Running the Node.js Server**](#running-the-nodejs-server)
    - [**Accessing the Web Interface**](#accessing-the-web-interface)
  - [**Endpoints**](#endpoints)
  - [**UI Features**](#ui-features)
  - [**Future Improvements**](#future-improvements)
  - [**License**](#license)

---

## **Overview**

This project demonstrates how to simulate real-world sensor data, transmit it to a server, store the data, and visualize it through a web-based dashboard. The sensor simulation is written in C++ and includes a variety of environmental sensors. The server side is implemented in Node.js, which handles storing data in an SQLite database and serves a frontend for real-time data display and statistics.

## **Technologies**

- **C++**: For simulating sensor data and sending it to the server.
- **libcurl**: For making HTTP requests from C++.
- **Node.js + Express**: Server for receiving data and serving the frontend.
- **SQLite**: Lightweight database for storing sensor data.
- **HTML/CSS/JavaScript**: Frontend for displaying real-time data and statistics.

## **Features**

- **Sensor Simulation**: Simulates multiple types of sensors (temperature, humidity, gas levels, radiation).
- **Real-time Data**: Sensor data is updated every minute and sent to the server.
- **Database Storage**: All sensor data is saved to an SQLite database for future reference.
- **Web Interface**: A clean and responsive UI displays current sensor data and statistics, including:
  - Min, max, and average values for each sensor type.
- **Statistics Calculation**: The system calculates the minimum, maximum, and average values for each sensor reading over time.

## **Project Structure**

```
sensor-simulation-system/
│
├── server/                   # Node.js server code
│   ├── package.json           # Node.js dependencies
│   ├── server.js              # Main server script
│   ├── database.js            # SQLite database handling
│   ├── statistics.js          # Statistics calculation module
│   ├── public/                # Frontend files for the UI
│   │   ├── index.html         # Main UI file
│   │   ├── styles.css         # CSS for styling the UI
│   │   ├── script.js          # Frontend logic and data fetching
│   └── data/                  # SQLite database folder
│       └── sensorData.db      # SQLite database file
│
├── simulation/                # C++ sensor simulation code
│   ├── main.cpp               # Main program for sensor data simulation
│   ├── sensors/               # Folder for different sensor types
│   │   ├── Sensor.h           # Base class for sensors
│   │   ├── TemperatureSensor.h# Temperature sensor class
│   │   ├── HumiditySensor.h    # Humidity sensor class
│   │   ├── GasSensor.h        # Dangerous gas sensor class
│   │   ├── RadiationSensor.h  # Radiation sensor class
│   └── http_client/           # C++ HTTP client to send sensor data
│       ├── HttpClient.h       # HTTP client header
│       └── HttpClient.cpp     # HTTP client implementation
│
└── README.md                  # Instructions for running the project
```

## **Setup and Installation**

### **C++ Simulation Setup**

1. **Install `libcurl`**:
   
   The C++ simulation sends data to the Node.js server using HTTP requests. You will need to install `libcurl` for this:

   ```bash
   # For Debian/Ubuntu:
   sudo apt-get install libcurl4-openssl-dev
   
   # For macOS (with Homebrew):
   brew install curl
   ```

2. **Compile the Simulation Code**:

   Navigate to the `simulation/` directory and compile the C++ simulation:

   ```bash
   cd simulation
   g++ -o simulation main.cpp http_client/HttpClient.cpp -lcurl
   ```

### **Node.js Server Setup**

1. **Install Node.js** (if not installed):

   - You can install Node.js from [here](https://nodejs.org/).

2. **Install Dependencies**:

   Navigate to the `server/` directory and install the required Node.js dependencies:

   ```bash
   cd server
   npm install
   ```

## **How to Run**

### **Running the C++ Simulation**

1. Once you have compiled the C++ code, you can run the sensor simulation, which will send data every 60 seconds to the Node.js server:

   ```bash
   ./simulation
   ```

2. The simulation will log sensor values for temperature, humidity, gas levels, and radiation to the console and send the data to the server.

### **Running the Node.js Server**

1. In the `server/` directory, start the Node.js server:

   ```bash
   node server.js
   ```

2. The server will be available on `http://localhost:3000`.

### **Accessing the Web Interface**

Open your browser and navigate to `http://localhost:3000` to view the sensor data dashboard.

## **Endpoints**

- **POST /sensor-data**:
  - Receives sensor data from the C++ simulation. This endpoint expects a JSON payload with the following structure:
    ```json
    {
        "temperature": 23.5,
        "humidity": 40.1,
        "gas": 0.5,
        "radiation": 0.002
    }
    ```

- **GET /sensor-data**:
  - Returns the most recent sensor data in JSON format.

- **GET /statistics**:
  - Returns statistical data (min, max, avg) for each sensor reading.

## **UI Features**

The user interface provides the following functionalities:

- **Real-time Sensor Data**: 
  - Displays the latest temperature, humidity, gas, and radiation levels updated every minute.
  
- **Statistics Section**: 
  - Displays the minimum, maximum, and average values for each sensor type, calculated from all stored data.

## **Future Improvements**

- **Enhanced Error Handling**: Add more robust error handling on the server and simulation side.
- **Alert System**: Implement thresholds for dangerous levels of gases or radiation to trigger warnings in the UI.
- **User Authentication**: Add user authentication for secure access to sensor data and statistics.
- **Mobile Responsiveness**: Improve the UI for better mobile support.

## **License**

This project is licensed under the MIT License.
