package io.privalou.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api")
public class ArtistController {
    @RequestMapping("/")
    public String home() {
        return "Hello Docker World";
    }
}
