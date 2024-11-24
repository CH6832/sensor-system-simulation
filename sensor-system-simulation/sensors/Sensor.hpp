#ifndef SENSOR_HPP
#define SENSOR_HPP

#include <string>

/// Base class for all sensor types
class Sensor {
public:
    // Constructor
    explicit Sensor(const std::string& type) : type(type) {}

    // Virtual destructor
    virtual ~Sensor() = default;

    // Pure virtual method to read sensor data
    virtual double read() const = 0;  // Method to override

    // Getter for sensor type
    virtual std::string getType() const {
        return type;
    }

protected:
    std::string type;  // Sensor type
};

#endif // SENSOR_HPP
