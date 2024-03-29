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

    public Hotel addHotel(Hotel hotel) {
        if(hotel != null) {
            hotelRepository.save(hotel);
        }

        return hotel;
    }

    public Hotel editHotel(int id, Hotel hotel) throws HotelNotFoundException {
        Optional<Hotel> optionalHotel = hotelRepository.findHotelById(id);
        Hotel dbHotel;

        if(optionalHotel.isPresent()) {
            dbHotel = optionalHotel.get();

            dbHotel.setName(hotel.getName());
            dbHotel.setAddress(hotel.getAddress());
            dbHotel.setLocation(hotel.getLocation());

            return hotelRepository.save(dbHotel);
        } else {
            throw new HotelNotFoundException(id);
        }
    }

    public void deleteHotel(int id) {
        hotelRepository.deleteById(id);
    }
}
