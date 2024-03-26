package com.veljkoknezevic.server.controller;

import com.veljkoknezevic.server.dto.LoginResponseDTO;
import com.veljkoknezevic.server.dto.RegistrationDTO;
import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Guest> register(@RequestBody RegistrationDTO dto) {
        Guest registered = authenticationService.registerUser(dto.email(), dto.password());

        return ResponseEntity.ok(registered);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginResponseDTO(@RequestBody RegistrationDTO dto) {
        LoginResponseDTO response = authenticationService.loginUser(dto.email(), dto.password());

        return ResponseEntity.ok(response);
    }

}
