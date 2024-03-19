package com.veljkoknezevic.server.controller;

import com.veljkoknezevic.server.model.Hotel;
import com.veljkoknezevic.server.model.Room;
import com.veljkoknezevic.server.service.HotelService;
import com.veljkoknezevic.server.service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    private final RoomService roomService;

    private final HotelService hotelService;

    public HotelController(RoomService roomService, HotelService hotelService) {
        this.roomService = roomService;
        this.hotelService = hotelService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable int id) {
        Hotel hotel = hotelService.findHotelById(id);

        return ResponseEntity.ok(hotel);
    }

    @PostMapping
    public ResponseEntity<Hotel> addHotel(@RequestBody Hotel hotel) {
        Hotel addedHotel = hotelService.addHotel(hotel);

        return ResponseEntity.ok(addedHotel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hotel> editHotel(@PathVariable int id, @RequestBody Hotel hotel) {
        Hotel response = hotelService.editHotel(id,hotel);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHotel(@PathVariable int id) {
        hotelService.deleteHotel(id);

        return ResponseEntity.ok(null);
    }

    // Room Endpoints

    @GetMapping("/{hotelId}/rooms/{roomId}")
    public ResponseEntity<Room> findRoom(@PathVariable int hotelId, @PathVariable int roomId) {
        Room room = roomService.findRoom(hotelId, roomId);

        return ResponseEntity.ok(room);
    }

    @PostMapping("/{hotelId}/rooms")
    public ResponseEntity<Room> addRoom(@PathVariable int hotelId, @RequestBody Room room) {
        Room response = roomService.addRoom(room, hotelId);

        return ResponseEntity.ok(room);
    }

    @PutMapping("/{hotelId}/rooms/{roomId}")
    public ResponseEntity<Room> editRoom(@PathVariable int hotelId, @PathVariable int roomId, @RequestBody Room room) {
        Room response = roomService.editRoom(roomId, hotelId, room);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{hotelId}/rooms/{roomId}")
    public ResponseEntity<?> deleteRoom(@PathVariable int hotelId, @PathVariable int roomId) {
        roomService.deleteRoom(hotelId, roomId);

        return ResponseEntity.status(200).body(null);
    }


}
