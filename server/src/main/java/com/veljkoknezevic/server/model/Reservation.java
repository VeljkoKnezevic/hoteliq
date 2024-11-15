package com.veljkoknezevic.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import java.util.Date;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "hotelId", nullable = false)
    @NotNull(message = "Hotel is required")
    private Hotel hotel;
    @ManyToOne
    @JoinColumn(name = "roomId", nullable = false)
    @NotNull(message = "Room is required")
    private Room room;

    @NotBlank(message = "Start date is required")
    private Date start;

    @NotBlank(message = "End date is required")
    @Future(message = "End date must be a future date")
    private Date end;
    @ManyToOne
    @JoinColumn(name = "guest_id", nullable = false)
    @NotBlank(message = "Guest is required")
    private Guest guest;

    public Reservation(Hotel hotel, Room room, Date start, Date end, Guest guest) {
        this.hotel = hotel;
        this.room = room;
        this.start = start;
        this.end = end;
        this.guest = guest;
    }

    public Reservation() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }


    public Guest getGuest() {
        return guest;
    }

    public void setGuest(Guest guest) {
        this.guest = guest;
    }
}
