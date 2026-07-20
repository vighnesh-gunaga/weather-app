package com.example.weatherapp.service;

import org.springframework.stereotype.Service;

@Service
public class WeatherService {

    public String getWeather(String city)
    {
        return "Weather data for "+city;
    }
}
