#ifndef GASSENSOR_HPP
#define GASSENSOR_HPP

#include "Sensor.hpp"
#include <cstdlib>  // For rand()
#include <ctime>    // For seeding rand()

/// Simulates a dangerous gas sensor
class GasSensor : public Sensor {
public:
    // Constructor
    GasSensor() : Sensor("GasSensor") {
        std::srand(static_cast<unsigned>(std::time(nullptr))); // Seed random number generator
    }

    // Override the read method
    double read() const override {
        // Simulate gas concentration value between 0 and 100
        return static_cast<double>(std::rand() % 101);
    }

    // Override the getType method
    std::string getType() const override {
        return "GasSensor";
    }
};

#endif // GASSENSOR_HPP
