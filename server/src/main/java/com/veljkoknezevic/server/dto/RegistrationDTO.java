package com.veljkoknezevic.server.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegistrationDTO(

        @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
        @Pattern(regexp = "^[a-zA-Z\\s-']+$", message = "First name can only contain letters, spaces, hyphens and apostrophes")
        String firstName,

        @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
        @Pattern(regexp = "^[a-zA-Z\\s-']+$", message = "First name can only contain letters, spaces, hyphens and apostrophes")
        String lastName,
        @Column(unique = true)
        @Email(message = "Please provide a valid email address")
        @NotBlank(message = "Email is required")
        String email,
        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters long")
        @Pattern(
                regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$",
                message = "Password must contain at least one letter and one number"
        )
        String password){

}
