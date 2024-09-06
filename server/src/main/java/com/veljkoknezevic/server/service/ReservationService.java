package com.veljkoknezevic.server.service;

import com.veljkoknezevic.server.dto.ReservationDTO;
import com.veljkoknezevic.server.exception.HotelNotFoundException;
import com.veljkoknezevic.server.exception.ReservationNotFoundException;
import com.veljkoknezevic.server.exception.RoomNotFoundException;
import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.model.Hotel;
import com.veljkoknezevic.server.model.Reservation;
import com.veljkoknezevic.server.model.Room;
import com.veljkoknezevic.server.repository.HotelRepository;
import com.veljkoknezevic.server.repository.ReservationRepository;
import com.veljkoknezevic.server.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;

    public ReservationService(ReservationRepository reservationRepository, HotelRepository hotelRepository, RoomRepository roomRepository) {
        this.reservationRepository = reservationRepository;
        this.hotelRepository = hotelRepository;
        this.roomRepository = roomRepository;
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

    public Reservation addReservation(ReservationDTO reservationDTO) {
        // Takes in dto from controller and turns it into a reservation

        Optional<Hotel> optionalHotel = hotelRepository.findHotelById(reservationDTO.hotelId());
        Hotel hotel = optionalHotel.orElseThrow(() -> new HotelNotFoundException(reservationDTO.hotelId()));

        Optional<Room> optionalRoom = roomRepository.findById(reservationDTO.roomId());
        Room room = optionalRoom.orElseThrow(() -> new RoomNotFoundException(reservationDTO.roomId()));

        return reservationRepository.save(new Reservation
                (hotel, room, reservationDTO.startDate(), reservationDTO.endDate()));
    }


    public void cancelReservation(int id) {
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        Reservation reservation = reservationOptional.orElseThrow(ReservationNotFoundException::new);

        reservationRepository.delete(reservation);
    }
}
