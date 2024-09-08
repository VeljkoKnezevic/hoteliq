package com.veljkoknezevic.server.service;

import com.veljkoknezevic.server.exception.HotelNotFoundException;
import com.veljkoknezevic.server.exception.RoomNotFoundException;
import com.veljkoknezevic.server.model.Hotel;
import com.veljkoknezevic.server.model.Room;
import com.veljkoknezevic.server.repository.HotelRepository;
import com.veljkoknezevic.server.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    private final HotelRepository hotelRepository;

    private final RoomRepository roomRepository;

    public RoomService(HotelRepository hotelRepository, RoomRepository roomRepository) {
        this.hotelRepository = hotelRepository;
        this.roomRepository = roomRepository;
    }

    public List<Room> findRoom(int hotelId) {
        Optional<Hotel> hotelOptional = hotelRepository.findHotelById(hotelId);
        Hotel hotel = hotelOptional.orElseThrow(() -> new HotelNotFoundException(hotelId));

       Optional<List<Room>> optionalRoomList = roomRepository.findRoomsByHotel(hotel);

        return optionalRoomList.orElseThrow(() -> new RoomNotFoundException(hotel.getRoom().get(0).getId()));
    }

    public Room addRoom(Room room, int hotelId) {
        Optional<Hotel> optionalHotel = hotelRepository.findHotelById(hotelId);
        Hotel hotel = optionalHotel.orElseThrow(() -> new HotelNotFoundException(hotelId));

        room.setHotel(hotel);
        Room response = roomRepository.save(room);

        return response;
    }

    public Room editRoom(int roomId, int hotelId, Room room) {
        Optional<Hotel> hotelOptional = hotelRepository.findHotelById(hotelId);
        Hotel hotel = hotelOptional.orElseThrow(() -> new HotelNotFoundException(hotelId));

        Optional<Room> roomOptional = roomRepository.findById(roomId);
        Room roomResponse = roomOptional.orElseThrow(() -> new RoomNotFoundException(roomId));


        if(hotelId == roomResponse.getHotel().getId()) {
            roomResponse.setNumber(room.getNumber());
            roomResponse.setRoomType(room.getRoomType());
            roomResponse.setIsAvailable(room.getIsAvailable());
            roomResponse.setFloor(room.getFloor());
            roomResponse.setHotel(room.getHotel());

            roomRepository.save(roomResponse);
        } else {
            throw new RoomNotFoundException(roomResponse.getId());
        }

        return roomResponse;
    }


}
