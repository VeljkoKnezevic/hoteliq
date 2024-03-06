package com.veljkoknezevic.server.repository;

import com.veljkoknezevic.server.model.Reservation;
import org.springframework.data.repository.CrudRepository;

public interface ReservationRepository extends CrudRepository<Reservation, Integer> {
}
