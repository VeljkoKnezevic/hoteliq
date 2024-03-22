package com.veljkoknezevic.server;

import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.model.Role;
import com.veljkoknezevic.server.repository.GuestRepository;
import com.veljkoknezevic.server.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @Bean
    CommandLineRunner run(RoleRepository roleRepository, GuestRepository guestRepository, PasswordEncoder passwordEncoder) {

        return args -> {
            if(roleRepository.findRoleByAuthority("STAFF").isPresent()) return;

            Role staffRole = roleRepository.save(new Role("STAFF"));
            Role guestRole = roleRepository.save(new Role("GUEST"));

            Set<Role> roles = new HashSet<>();
            roles.add(staffRole);

            Guest staff = new Guest("staff@gmail.com", passwordEncoder.encode("password"), roles);
            guestRepository.save(staff);
        };
    }


}
