#ifndef HUMIDITYSENSOR_HPP
#define HUMIDITYSENSOR_HPP

#include "Sensor.hpp"
#include <cstdlib>  // For rand()
#include <ctime>    // For seeding rand()

/// Simulates a humidity sensor
class HumiditySensor : public Sensor {
public:
    // Constructor
    HumiditySensor() : Sensor("HumiditySensor") {
        std::srand(static_cast<unsigned>(std::time(nullptr))); // Seed random number generator
    }

    // Override the read method (correct name and signature)
    double read() const override {
        // Simulate humidity percentage between 0 and 100
        return static_cast<double>(std::rand() % 101);
    }
};

#endif // HUMIDITYSENSOR_HPP
