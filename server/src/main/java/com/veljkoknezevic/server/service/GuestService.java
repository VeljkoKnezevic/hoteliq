package com.veljkoknezevic.server.service;

import com.veljkoknezevic.server.dto.GuestDTO;
import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.model.Hotel;
import com.veljkoknezevic.server.repository.GuestRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GuestService {
    private final GuestRepository guestRepository;

    ModelMapper modelMapper = new ModelMapper();

    public GuestService(GuestRepository guestRepository) {
        this.guestRepository = guestRepository;
    }

    public List<GuestDTO> findALlGuests() {
        Iterable<Guest> allGuests = guestRepository.findAll();
        List<GuestDTO> result = new ArrayList<GuestDTO>();

        allGuests.forEach(guest -> {
            GuestDTO guestDTO = modelMapper.map(guest, GuestDTO.class);

            result.add(guestDTO);
        });

        return result;
    }
    public void deleteGuest(int id) {
        guestRepository.deleteById(id);
    }
}
