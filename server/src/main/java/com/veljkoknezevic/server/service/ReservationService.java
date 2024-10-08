package com.veljkoknezevic.server.service;

import com.veljkoknezevic.server.dto.DatesDTO;
import com.veljkoknezevic.server.dto.ReservationDTO;
import com.veljkoknezevic.server.exception.GuestNotFoundException;
import com.veljkoknezevic.server.exception.HotelNotFoundException;
import com.veljkoknezevic.server.exception.ReservationNotFoundException;
import com.veljkoknezevic.server.exception.RoomNotFoundException;
import com.veljkoknezevic.server.model.Guest;
import com.veljkoknezevic.server.model.Hotel;
import com.veljkoknezevic.server.model.Reservation;
import com.veljkoknezevic.server.model.Room;
import com.veljkoknezevic.server.repository.GuestRepository;
import com.veljkoknezevic.server.repository.HotelRepository;
import com.veljkoknezevic.server.repository.ReservationRepository;
import com.veljkoknezevic.server.repository.RoomRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;

    private final GuestRepository guestRepository;

    ModelMapper modelMapper  = new ModelMapper();

    public ReservationService(ReservationRepository reservationRepository, HotelRepository hotelRepository, RoomRepository roomRepository, GuestRepository guestRepository) {
        this.reservationRepository = reservationRepository;
        this.hotelRepository = hotelRepository;
        this.roomRepository = roomRepository;
        this.guestRepository = guestRepository;
    }

    public List<DatesDTO> findReservations(int hotelId) {
        Optional<Hotel> hotelOptional = hotelRepository.findById(hotelId);
        Hotel hotel = hotelOptional.orElseThrow(() ->new HotelNotFoundException(hotelId));

        Optional<List<Reservation>> reservationOptional = reservationRepository.findReservationByHotel(hotel);
        List<Reservation> reservations = reservationOptional.orElseThrow(ReservationNotFoundException::new);
        List<DatesDTO> datesDTOS = new ArrayList<>();


        reservations.forEach(reservation -> {
            DatesDTO datesDTO = modelMapper.map(reservation, DatesDTO.class);

            datesDTOS.add(datesDTO);
        });

        return datesDTOS;
    }

    public Reservation addReservation(ReservationDTO reservationDTO) {
        // Takes in dto from controller and turns it into a reservation



        Optional<Hotel> optionalHotel = hotelRepository.findHotelById(reservationDTO.getHotelId());
        Hotel hotel = optionalHotel.orElseThrow(() -> new HotelNotFoundException(reservationDTO.getHotelId()));

        Optional<Room> optionalRoom = roomRepository.findById(reservationDTO.getRoomId());
        Room room = optionalRoom.orElseThrow(() -> new RoomNotFoundException(reservationDTO.getRoomId()));

        Optional<Guest> guestOptional = guestRepository.findById(reservationDTO.getGuestId());
        Guest guest = guestOptional.orElseThrow(() -> new GuestNotFoundException(reservationDTO.getGuestId()));

        return reservationRepository.save(new Reservation
                (hotel, room, reservationDTO.getStartDate(), reservationDTO.getEndDate(), guest));
    }


    public void cancelReservation(int id) {
        Optional<Reservation> reservationOptional = reservationRepository.findById(id);
        Reservation reservation = reservationOptional.orElseThrow(ReservationNotFoundException::new);

        reservationRepository.delete(reservation);
    }
}
