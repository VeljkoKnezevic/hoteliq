package com.veljkoknezevic.server.dto;

import com.veljkoknezevic.server.model.Guest;
import jakarta.validation.constraints.NotNull;

public record LoginResponseDTO(@NotNull(message = "Guest cannot be null") Guest guest,@NotNull(message = "Jwt token cannot be null") String jwt) {

}
