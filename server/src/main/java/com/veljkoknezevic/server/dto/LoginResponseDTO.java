package com.veljkoknezevic.server.dto;

import com.veljkoknezevic.server.model.Guest;

public record LoginResponseDTO(Guest guest, String jwt) {

}
