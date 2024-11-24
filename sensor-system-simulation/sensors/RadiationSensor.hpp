#ifndef RADIATIONSENSOR_H
#define RADIATIONSENSOR_H

#include "Sensor.hpp"
#include <cstdlib>  // For rand()
#include <ctime>    // For seeding rand()

/// Simulates a radiation sensor
class RadiationSensor : public Sensor {
public:
    // Constructor
    RadiationSensor() : Sensor("RadiationSensor") {
        std::srand(static_cast<unsigned>(std::time(nullptr))); // Seed random number generator
    }

    // Override the read method
    double read() const override {
        // Simulate radiation level value between 0 and 200
        return static_cast<double>(std::rand() % 201);
    }
};

#endif // RADIATIONSENSOR_H
