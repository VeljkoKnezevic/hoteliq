package com.veljkoknezevic.server.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "hotelId", nullable = false)
    private Hotel hotel;
    @ManyToOne
    @JoinColumn(name = "roomId", nullable = false)
    private Room room;

    private Date start;
    private Date end;

    // Need to implement statuses for pending, refund,...
    @ManyToOne
    @JoinColumn(name = "status", nullable = false)
    private Status status;

    @OneToOne
    @JoinColumn(name = "guestId")
    private Guest guest;

    public Reservation(int id, Hotel hotel, Room room, Date start, Date end) {
        this.id = id;
        this.hotel = hotel;
        this.room = room;
        this.start = start;
        this.end = end;
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Guest getGuest() {
        return guest;
    }

    public void setGuest(Guest guest) {
        this.guest = guest;
    }
}
