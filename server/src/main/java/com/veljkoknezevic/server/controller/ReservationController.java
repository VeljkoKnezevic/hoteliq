package com.veljkoknezevic.server.controller;

import com.veljkoknezevic.server.dto.DatesDTO;
import com.veljkoknezevic.server.dto.ReservationDTO;
import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.model.Reservation;
import com.veljkoknezevic.server.repository.ReservationRepository;
import com.veljkoknezevic.server.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
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

    @GetMapping("/{hotelId}")
    public ResponseEntity<List<DatesDTO>> reservationHistory(@PathVariable int hotelId) {
        List<DatesDTO> reservations = reservationService.findReservations(hotelId);
        return ResponseEntity.ok(reservations);
    }


    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestBody @Valid ReservationDTO dto, BindingResult bindingResult)  {
        if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(null);
        }

        Reservation reservation = reservationService.addReservation(dto);

        return ResponseEntity.ok(reservation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelReservation(@PathVariable int id) {
        reservationService.cancelReservation(id);

        return ResponseEntity.ok(null);
    }

}
