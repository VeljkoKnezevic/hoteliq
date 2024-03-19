package com.veljkoknezevic.server.service;

import com.veljkoknezevic.server.exception.ReservationNotFoundException;
import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.model.Reservation;
import com.veljkoknezevic.server.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public List<Reservation> findReservations(Guest guest) {
        Optional<List<Reservation>> reservationOptional = reservationRepository.findReservationsByGuest(guest);
        List<Reservation> reservation = reservationOptional.orElseThrow(ReservationNotFoundException::new);


        return reservation;
    }

    public Reservation findReservationById(int id) {
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        Reservation reservation  = reservationOptional.orElseThrow(ReservationNotFoundException::new);

        return reservation;
    }

    public Reservation addReservation(Reservation reservation) {
        reservationRepository.save(reservation);

        return reservation;
    }


    public void cancelReservation(int id) {
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        Reservation reservation = reservationOptional.orElseThrow(ReservationNotFoundException::new);

        reservationRepository.delete(reservation);
    }
}
