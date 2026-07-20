package com.example.weatherapp;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class Hello {
    @GetMapping("/word")
    public String helloMessage()
    {
        return "Hello world!";
    }
}
