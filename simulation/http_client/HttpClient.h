#ifndef HTTP_CLIENT_H
#define HTTP_CLIENT_H

#include <string>

class HttpClient {
public:
    void post(const std::string& url, const std::string& jsonData);
};

#endif // HTTP_CLIENT_H
