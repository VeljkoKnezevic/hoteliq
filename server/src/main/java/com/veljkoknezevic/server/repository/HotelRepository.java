package com.veljkoknezevic.server.repository;

import com.veljkoknezevic.server.model.Hotel;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface HotelRepository extends CrudRepository<Hotel, Integer> {
    Optional<Hotel> findHotelById(int id);
}
