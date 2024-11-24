#ifndef TEMPERATURESENSOR_HPP
#define TEMPERATURESENSOR_HPP

#include "Sensor.hpp"
#include <cstdlib>  // For rand()
#include <ctime>    // For seeding rand()

/// Simulates a temperature sensor
class TemperatureSensor : public Sensor {
public:
    // Constructor
    TemperatureSensor() : Sensor("TemperatureSensor") {
        std::srand(static_cast<unsigned>(std::time(nullptr))); // Seed random number generator
    }

    // Override the read method (correct name and signature)
    double read() const override {
        // Simulate temperature value between -50 and 50
        return static_cast<double>((std::rand() % 101) - 50);
    }
};

#endif // TEMPERATURESENSOR_HPP
