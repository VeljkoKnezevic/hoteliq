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

    public Room editRoom(int roomId, int hotelId, Room room) throws RoomNotFoundException {
        Optional<Hotel> hotelOptional = hotelRepository.findHotelById(hotelId);
        Hotel hotel = hotelOptional.orElseThrow(() -> new HotelNotFoundException(hotelId));

        Optional<Room> roomOptional = roomRepository.findById(roomId);
        Room dbRoom;

        if(roomOptional.isPresent()) {
            dbRoom = roomOptional.get();

            dbRoom.setNumber(room.getNumber() == 0 ? dbRoom.getNumber() : room.getNumber());
            dbRoom.setRoomType(room.getRoomType() == null ? dbRoom.getRoomType() : room.getRoomType());
            dbRoom.setIsAvailable(room.getIsAvailable());
            dbRoom.setFloor(room.getFloor() == 0 ? dbRoom.getFloor() : room.getFloor());
            dbRoom.setHotel(hotel);
        } else {
            throw new RoomNotFoundException(roomId);
        }

        return roomRepository.save(dbRoom);
    }


}
