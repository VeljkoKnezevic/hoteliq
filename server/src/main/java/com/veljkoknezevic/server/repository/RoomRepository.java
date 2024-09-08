package com.veljkoknezevic.server.repository;

import com.veljkoknezevic.server.model.Hotel;
import com.veljkoknezevic.server.model.Room;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends CrudRepository<Room, Integer> {

   Optional<List<Room>> findRoomsByHotel(Hotel hotel);
}
