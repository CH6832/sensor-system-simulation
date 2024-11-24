#include "HttpClient.hpp"
#include <curl/curl.h>
#include <iostream>

void HttpClient::post(const std::string& url, const std::string& jsonData) {
    CURL* curl;
    CURLcode res;
    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();
    if (curl) {
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, jsonData.c_str());

        res = curl_easy_perform(curl);
        if (res != CURLE_OK)
            std::cerr << "CURL Error: " << curl_easy_strerror(res) << std::endl;

        curl_easy_cleanup(curl);
    }
    curl_global_cleanup();
}
