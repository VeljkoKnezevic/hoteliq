package com.veljkoknezevic.server.service;

import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.model.Hotel;
import com.veljkoknezevic.server.repository.GuestRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GuestService {

    private GuestRepository guestRepository;

    public GuestService(GuestRepository guestRepository) {
        this.guestRepository = guestRepository;
    }

    public List<Guest> findALlGuests() {
        Iterable<Guest> allGuests = guestRepository.findAll();

        List<Guest> result = new ArrayList<>();

        allGuests.forEach(result::add);
        return result;
    }
}
