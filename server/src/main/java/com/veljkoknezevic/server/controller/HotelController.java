package com.veljkoknezevic.server.controller;

import com.veljkoknezevic.server.model.Hotel;
import com.veljkoknezevic.server.model.Room;
import com.veljkoknezevic.server.service.HotelService;
import com.veljkoknezevic.server.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    private final RoomService roomService;

    private final HotelService hotelService;

    public HotelController(RoomService roomService, HotelService hotelService) {
        this.roomService = roomService;
        this.hotelService = hotelService;
    }

    @GetMapping
    public ResponseEntity<List<Hotel>> getHotels() {
        List<Hotel> hotels = hotelService.findHotels();

        return ResponseEntity.ok(hotels);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable int id) {
        Hotel hotel = hotelService.findHotelById(id);

        return ResponseEntity.ok(hotel);
    }

    @PostMapping
    public ResponseEntity<Hotel> addHotel(@RequestBody @Valid Hotel hotel, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(null);
        }

        Hotel addedHotel = hotelService.addHotel(hotel);

        return ResponseEntity.ok(addedHotel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hotel> editHotel(@PathVariable int id, @RequestBody @Valid Hotel hotel, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(null);
        }

        Hotel response = hotelService.editHotel(id,hotel);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHotel(@PathVariable int id) {
        hotelService.deleteHotel(id);

        return ResponseEntity.ok(null);
    }

    // Room Endpoints

    @GetMapping("/{hotelId}/rooms")
    public ResponseEntity<List<Room>> findRoomsByHotelId(@PathVariable int hotelId) {
        List<Room> roomList = roomService.findRoom(hotelId);

        return ResponseEntity.ok(roomList);
    }

    @PostMapping("/{hotelId}/rooms")
    public ResponseEntity<Room> addRoom(@PathVariable int hotelId, @RequestBody @Valid Room room, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(null);
        }

        Room response = roomService.addRoom(room, hotelId);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{hotelId}/rooms/{roomId}")
    public ResponseEntity<Room> editRoom(@PathVariable int hotelId, @PathVariable int roomId, @RequestBody @Valid Room room, BindingResult bindingResult) {

        if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(null);
        }

        Room response = roomService.editRoom(roomId, hotelId, room);

        return ResponseEntity.ok(response);
    }


}
