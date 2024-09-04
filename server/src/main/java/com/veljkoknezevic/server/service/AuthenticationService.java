package com.veljkoknezevic.server.service;

import com.veljkoknezevic.server.dto.LoginResponseDTO;
import com.veljkoknezevic.server.exception.GuestNotFoundException;
import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.model.Role;
import com.veljkoknezevic.server.repository.GuestRepository;
import com.veljkoknezevic.server.repository.RoleRepository;
import com.veljkoknezevic.server.security.CustomAuthenticationProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.token.TokenService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class AuthenticationService {

    private final GuestRepository guestRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private CustomAuthenticationProvider authenticationProvider;

    private JwtTokenService tokenService;

    public AuthenticationService(GuestRepository guestRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, CustomAuthenticationProvider authenticationProvider, JwtTokenService tokenService) {
        this.guestRepository = guestRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationProvider = authenticationProvider;
        this.tokenService = tokenService;
    }

    public Guest registerUser(String firstName, String lastName, String email, String password) {

        String encoded = passwordEncoder.encode(password);

        Optional<Role> userRoleOptional = roleRepository.findRoleByAuthority("GUEST");
        Role userRole = userRoleOptional.orElseThrow(() -> new RuntimeException("Role not found"));

        Set<Role> authorities = new HashSet<>();

        authorities.add(userRole);

        return guestRepository.save(new Guest(firstName, lastName,email , encoded, authorities));
    }

    public LoginResponseDTO loginUser(String email, String password) {

        try {
            Authentication auth = authenticationProvider.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            String token = tokenService.genJwt(auth);
            Guest guest = guestRepository.findGuestByEmail(email).orElseThrow(() -> new GuestNotFoundException(email));


            return new LoginResponseDTO(guest, token);

        } catch (AuthenticationException e) {
            e.getMessage();
        }

        return null;
    }
 }
