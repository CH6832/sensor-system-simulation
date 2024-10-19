#include <iostream>
#include <thread>
#include <chrono>
#include "sensors/TemperatureSensor.h"
#include "sensors/HumiditySensor.h"
#include "sensors/GasSensor.h"
#include "sensors/RadiationSensor.h"
#include "http_client/HttpClient.h"

#define SERVER_URL "http://localhost:3000/sensor-data"

int main() {
    TemperatureSensor tempSensor;
    HumiditySensor humiditySensor;
    GasSensor gasSensor;
    RadiationSensor radiationSensor;
    
    HttpClient httpClient;

    while (true) {
        // Simulate reading from sensors
        double temperature = tempSensor.read();
        double humidity = humiditySensor.read();
        double gasLevel = gasSensor.read();
        double radiationLevel = radiationSensor.read();
        
        // Print simulated values for monitoring
        std::cout << "Temperature: " << temperature << " °C" << std::endl;
        std::cout << "Humidity: " << humidity << " %" << std::endl;
        std::cout << "Gas Level: " << gasLevel << " ppm" << std::endl;
        std::cout << "Radiation: " << radiationLevel << " µSv/h" << std::endl;

        // Send data to server
        std::string jsonData = "{\"temperature\":" + std::to_string(temperature) + 
                               ", \"humidity\":" + std::to_string(humidity) + 
                               ", \"gas\":" + std::to_string(gasLevel) + 
                               ", \"radiation\":" + std::to_string(radiationLevel) + "}";

        httpClient.post(SERVER_URL, jsonData);

        // Wait for 60 seconds
        std::this_thread::sleep_for(std::chrono::minutes(1));
    }

    return 0;
}
