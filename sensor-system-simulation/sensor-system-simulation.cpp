#include <iostream>
#include <thread>
#include <chrono>
#include "sensors/TemperatureSensor.hpp"
#include "sensors/HumiditySensor.hpp"
#include "sensors/GasSensor.hpp"
#include "sensors/RadiationSensor.hpp"
#include "http_client/HttpClient.hpp"

#define SERVER_URL "http://localhost:3000/sensor-data"

int main() {
    // Create sensor objects
    std::vector<std::unique_ptr<Sensor>> sensors;
    sensors.emplace_back(std::make_unique<GasSensor>());
    sensors.emplace_back(std::make_unique<RadiationSensor>());

    try {
        while (true) {
            for (const auto& sensor : sensors) {
                double value = sensor->read();
                std::cout << sensor->getType() << " Reading: " << value << std::endl;
                // Simulate sending data via HTTP (implement send logic if needed)
            }
            std::this_thread::sleep_for(std::chrono::seconds(2));
        }
    }
    catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }
}
