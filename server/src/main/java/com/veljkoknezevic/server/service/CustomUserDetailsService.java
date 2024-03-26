package com.veljkoknezevic.server.service;

import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.repository.GuestRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final GuestRepository guestRepository;

    public CustomUserDetailsService(GuestRepository guestRepository) {
        this.guestRepository = guestRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Guest> guestOptional = guestRepository.findGuestByEmail(username);

        return guestOptional.orElseThrow(() -> new UsernameNotFoundException("Invalid email"));
    }
}
