#ifndef TEMPERATURE_SENSOR_H
#define TEMPERATURE_SENSOR_H

#include "Sensor.h"
#include <random>

class TemperatureSensor : public Sensor {
public:
    double read() override {
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_real_distribution<> dis(-10.0, 40.0); // Realistic temperature range
        return dis(gen);
    }
};

#endif // TEMPERATURE_SENSOR_H
