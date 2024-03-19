package com.veljkoknezevic.server.repository;

import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.model.Reservation;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends CrudRepository<Reservation, Integer> {

    Optional<List<Reservation>> findReservationsByGuest(Guest guest);
}
