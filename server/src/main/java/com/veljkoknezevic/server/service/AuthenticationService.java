package com.veljkoknezevic.server.service;

import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.model.Role;
import com.veljkoknezevic.server.repository.GuestRepository;
import com.veljkoknezevic.server.repository.RoleRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class AuthenticationService {

    private final GuestRepository guestRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(GuestRepository guestRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.guestRepository = guestRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public Guest registerUser(String email, String password) {

        String encoded = passwordEncoder.encode(password);

        Optional<Role> userRoleOptional = roleRepository.findRoleByAuthority("GUEST");
        Role userRole = userRoleOptional.orElseThrow(() -> new RuntimeException("Role not found"));

        Set<Role> authorities = new HashSet<>();

        authorities.add(userRole);



        return guestRepository.save(new Guest(email , encoded, authorities));
    }
}
