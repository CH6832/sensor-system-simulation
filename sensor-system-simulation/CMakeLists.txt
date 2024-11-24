# CMakeList.txt : CMake project for sensor-system-simulation, include source and define
# project specific logic here.
#

# Add source to this project's executable.
add_executable (sensor-system-simulation "sensor-system-simulation.cpp"  "http_client/HttpClient.cpp" "http_client/HttpClient.hpp" "sensors/GasSensor.hpp")

if (CMAKE_VERSION VERSION_GREATER 3.12)
  set_property(TARGET sensor-system-simulation PROPERTY CXX_STANDARD 20)
endif()

if(WIN32)
    # Specify the paths to the libraries and includes for Windows
    set(LIB_PATH "C:/Users/chris/vcpkg/installed/x64-windows/lib")
    set(INCLUDE_PATH "C:/Users/chris/vcpkg/installed/x64-windows/include")
    set(BIN_PATH "C:/Users/chris/vcpkg/installed/x64-windows/bin")
    # Add include directories
    include_directories(${INCLUDE_PATH})
    # Specify the paths to the libraries
    set(LIBCURL_PATH "${LIB_PATH}/libcurl.lib")
    # Link against Windows libraries
    target_link_libraries( sensor-system-simulation PRIVATE 
        ${LIBCURL_PATH}
    )
    add_custom_command(TARGET sensor-system-simulation POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different
        "${BIN_PATH}/libcurl.dll" $<TARGET_FILE_DIR:sensor-system-simulation>
    )
elseif(APPLE)
    # Find CURL on macOS
    find_package(CURL REQUIRED)
    # Add include directories
    include_directories(${CURL_INCLUDE_DIRS})
    # Link against macOS libraries
    target_link_libraries(sensor-system-simulation PRIVATE 
        ${CURL_LIBRARIES}
    )
    # Additional macOS-specific configurations if needed
    message(STATUS "CURL library found: ${CURL_LIBRARIES}")
    message(STATUS "CURL include directories: ${CURL_INCLUDE_DIRS}")
    # Use system frameworks (if applicable)
    target_link_libraries(sensor-system-simulation PRIVATE "-framework CoreFoundation")

elseif(UNIX)  # This will match Linux/Unix systems
    # Specify the paths to the libraries and includes for UNIX
    find_package(CURL REQUIRED)
    # Add include directories
    include_directories(${CURL_INCLUDE_DIRS})
    # Link against Unix libraries
    target_link_libraries(sensor-system-simulation PRIVATE 
        ${CURL_LIBRARIES}
    )
    # Additional linking or library settings if needed
    message(STATUS "CURL library found: ${CURL_LIBRARIES}")
    message(STATUS "CURL include directories: ${CURL_INCLUDE_DIRS}")
endif()