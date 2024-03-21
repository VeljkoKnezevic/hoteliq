package com.veljkoknezevic.server.security;


import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.model.Role;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final CustomUserDetailsService userDetailsService;

    private final PasswordEncoder passwordEncoder;

    public CustomAuthenticationProvider(CustomUserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        Guest guest = (Guest) userDetailsService.loadUserByUsername(authentication.getName());
        String email = authentication.getName();
        String password = authentication.getCredentials().toString();

        if(email.equals(guest.getEmail()) && passwordEncoder.matches(guest.getPassword(), email)) {
            Set<Role> roles = new HashSet<>();
            roles.add(new Role(1, "GUEST"));

            return new UsernamePasswordAuthenticationToken(email, password, roles);
        } else {
            throw new BadCredentialsException("Account doesn't exist");
        }

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
