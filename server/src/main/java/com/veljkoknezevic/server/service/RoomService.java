package com.veljkoknezevic.server.service;

import com.veljkoknezevic.server.exception.HotelNotFoundException;
import com.veljkoknezevic.server.exception.RoomNotFoundException;
import com.veljkoknezevic.server.model.Hotel;
import com.veljkoknezevic.server.model.Room;
import com.veljkoknezevic.server.repository.HotelRepository;
import com.veljkoknezevic.server.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoomService {

    private final HotelRepository hotelRepository;

    private final RoomRepository roomRepository;

    public RoomService(HotelRepository hotelRepository, RoomRepository roomRepository) {
        this.hotelRepository = hotelRepository;
        this.roomRepository = roomRepository;
    }

    public Room findRoom(int hotelId, int roomId) {
        Optional<Hotel> hotelOptional = hotelRepository.findHotelById(hotelId);
        Hotel hotel = hotelOptional.orElseThrow(() -> new HotelNotFoundException(hotelId));

        Optional<Room> roomOptional = roomRepository.findRoomByIdAndHotel(roomId, hotel);

        return roomOptional.orElseThrow(() -> new RoomNotFoundException(roomId));
    }

    public Room addRoom(Room room, int hotelId) {
        roomRepository.save(room);

        return room;
    }

    public Room editRoom(int roomId, int hotelId, Room room) {
        Optional<Hotel> hotelOptional = hotelRepository.findHotelById(hotelId);
        Hotel hotel = hotelOptional.orElseThrow(() -> new HotelNotFoundException(hotelId));

        Optional<Room> roomOptional = roomRepository.findById(roomId);
        Room roomResponse = roomOptional.orElseThrow(() -> new RoomNotFoundException(roomId));


        if(hotelId == roomResponse.getHotel().getId()) {
            roomResponse.setNumber(room.getNumber());
            roomResponse.setRoomType(room.getRoomType());
            roomResponse.setAvailable(room.isAvailable());
            roomResponse.setFloor(room.getFloor());
            roomResponse.setHotel(room.getHotel());

            roomRepository.save(roomResponse);
        } else {
            throw new RoomNotFoundException(roomResponse.getId());
        }

        return roomResponse;
    }


    public void deleteRoom(int hotelId, int roomId) {
        Optional<Hotel> hotelOptional = hotelRepository.findHotelById(hotelId);
        Hotel hotel = hotelOptional.orElseThrow(() -> new HotelNotFoundException(hotelId));

        Optional<Room> optionalRoom = roomRepository.findRoomByIdAndHotel(roomId, hotel);
        Room room = optionalRoom.orElseThrow(() -> new RoomNotFoundException(roomId));

        roomRepository.delete(room);
    }

}
