package com.veljkoknezevic.server.controller;

import com.veljkoknezevic.server.dto.RegistrationDTO;
import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.service.AuthenticationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public Guest register(@RequestBody RegistrationDTO dto) {
        return authenticationService.registerUser(dto.email(), dto.password());
    }

}
