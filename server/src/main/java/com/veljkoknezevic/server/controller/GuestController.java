package com.veljkoknezevic.server.controller;

import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.service.GuestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/guests")
public class GuestController {

    private GuestService guestService;

    public GuestController(GuestService guestService) {
        this.guestService = guestService;
    }

    @GetMapping
    public ResponseEntity<List<Guest>> getGuests() {
        List<Guest> guests = guestService.findALlGuests();

        return ResponseEntity.ok(guests);
    }
}