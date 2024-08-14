package com.veljkoknezevic.server.service;

import com.veljkoknezevic.server.model.Hotel;
import com.veljkoknezevic.server.repository.HotelRepository;
import com.veljkoknezevic.server.exception.HotelNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;

    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    public List<Hotel> findHotels() {
        Iterable<Hotel> hotels = hotelRepository.findAll();
        List<Hotel> result = new ArrayList<>();

        hotels.forEach(result::add);
        return result;
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

            dbHotel.setName(hotel.getName() == null ? dbHotel.getName() : hotel.getName());
            dbHotel.setAddress(hotel.getAddress() == null ? dbHotel.getAddress() : hotel.getAddress());
            dbHotel.setLocation(hotel.getLocation() == null ? dbHotel.getLocation() : hotel.getLocation());
            dbHotel.setPrice(hotel.getPrice() == null ? dbHotel.getPrice() : hotel.getPrice());
            dbHotel.setRating(hotel.getRating() == null ? dbHotel.getRating() : hotel.getRating());

            return hotelRepository.save(dbHotel);
        } else {
            throw new HotelNotFoundException(id);
        }
    }

    public void deleteHotel(int id) {
        hotelRepository.deleteById(id);
    }



}
