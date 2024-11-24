#ifndef HTTP_CLIENT_HPP
#define HTTP_CLIENT_HPP

#include <string>

class HttpClient {
public:
    void post(const std::string& url, const std::string& jsonData);
};

#endif // HTTP_CLIENT_HPP
