package com.veljkoknezevic.server.service;

import com.veljkoknezevic.server.model.Hotel;
import com.veljkoknezevic.server.repository.HotelRepository;
import com.veljkoknezevic.server.exception.HotelNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;

    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }


    public Hotel findHotelById(int id) {
        Optional<Hotel> hotel = hotelRepository.findHotelById(id);

        return hotel.orElseThrow(() -> new HotelNotFoundException(id));
    }
}
