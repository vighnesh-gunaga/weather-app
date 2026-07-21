package com.example.weatherapp.service;

import com.example.weatherapp.dto.WeatherResponse;
import com.example.weatherapp.exception.WeatherException;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;

@Service
public class WeatherService {

    @Value("${weather.api.url}")
    private String apiUrl;

    @Value("${weather.api.key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();

    public WeatherResponse getWeather(String city) {

        try {

            OpenWeatherResponse response = restClient.get()
                    .uri(apiUrl + "?q=" + city + "&appid=" + apiKey + "&units=metric")
                    .retrieve()
                    .body(OpenWeatherResponse.class);

            return new WeatherResponse(
                    response.name,
                    response.main.temp,
                    response.main.feelsLike,
                    response.main.humidity,
                    response.weather[0].description,
                    response.wind.speed
            );

        } catch (HttpClientErrorException.NotFound ex) {

            throw new WeatherException(
                    "Weather information could not be found for location: " + city
            );
        }
    }

    private static class OpenWeatherResponse {

        public String name;
        public Main main;
        public Weather[] weather;
        public Wind wind;
    }

    private static class Main {

        public double temp;

        @JsonProperty("feels_like")
        public double feelsLike;

        public int humidity;
    }

    private static class Weather {

        public String description;
    }

    private static class Wind {

        public double speed;
    }
}