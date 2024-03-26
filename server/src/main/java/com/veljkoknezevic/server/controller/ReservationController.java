package com.veljkoknezevic.server.controller;

import com.veljkoknezevic.server.dto.ReservationDTO;
import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.model.Reservation;
import com.veljkoknezevic.server.repository.ReservationRepository;
import com.veljkoknezevic.server.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
public class ReservationController {
    //This endpoint should be disabled for user without logging in
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> reservationHistory(Guest guest) {
        List<Reservation> reservations = reservationService.findReservations(guest);

        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> detailedReservationInfo(@PathVariable int id) {
        Reservation reservation = reservationService.findReservationById(id);

        return ResponseEntity.ok(reservation);
    }

    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestBody ReservationDTO dto) {
        Reservation reservation = reservationService.addReservation(dto);

        return ResponseEntity.ok(reservation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelReservation(@PathVariable int id) {
        reservationService.cancelReservation(id);

        return ResponseEntity.ok(null);
    }

}
