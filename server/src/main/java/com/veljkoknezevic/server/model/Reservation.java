package com.veljkoknezevic.server.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int hotelId;
    private int roomId;

    private Date start;
    private Date end;

    // Need to implement statuses for pending, refund,...
    private String status;

    // Need to implement info from spring security
    private int guestId;
}
