package com.veljkoknezevic.server.controller;

import com.veljkoknezevic.server.dto.LoginResponseDTO;
import com.veljkoknezevic.server.dto.RegistrationDTO;
import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<Guest> register(@RequestBody @Valid RegistrationDTO dto, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(null);
        }

        Guest registered = authenticationService.registerUser(dto.firstName(), dto.lastName(), dto.email(), dto.password());

        return ResponseEntity.ok(registered);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginResponseDTO(@RequestBody @Valid RegistrationDTO dto, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(null);
        }

        LoginResponseDTO response = authenticationService.loginUser(dto.email(), dto.password());

        return ResponseEntity.ok(response);
    }


}
