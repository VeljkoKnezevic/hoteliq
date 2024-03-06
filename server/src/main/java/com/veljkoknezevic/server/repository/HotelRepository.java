package com.veljkoknezevic.server.repository;

import com.veljkoknezevic.server.model.Hotel;
import org.springframework.data.repository.CrudRepository;

public interface HotelRepository extends CrudRepository<Hotel, Integer> {
}
