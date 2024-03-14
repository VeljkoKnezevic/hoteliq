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

//    @GetMapping("/{hotelId}/rooms/{roomId}")
//    public ResponseEntity<?> findRoom(@PathVariable int hotelId, @PathVariable int roomId) {
//
//    }
//
//    @PostMapping("/{hotelId}/rooms")
//    public ResponseEntity<?> addRoom(@PathVariable int hotelId, @RequestBody Room room) {
//
//    }
//
//    @PutMapping("/{hotelId}/rooms/{roomId}")
//    public ResponseEntity<?> editRoom(@PathVariable int hotelId, @PathVariable int roomId, @RequestBody Room room) {
//
//    }
//
//    @DeleteMapping("/{hotelId}/rooms/{roomId}")
//    public ResponseEntity<?> deleteRoom(@PathVariable int hotelId, @PathVariable int roomId) {
//
//    }


}
