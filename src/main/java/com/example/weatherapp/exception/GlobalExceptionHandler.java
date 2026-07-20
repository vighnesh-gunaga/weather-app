package com.example.weatherapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(WeatherException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleWeatherException(WeatherException ex)
    {
        return new ErrorResponse("City Not Found!",ex.getMessage());
    }
}
