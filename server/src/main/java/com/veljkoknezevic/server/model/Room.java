package com.veljkoknezevic.server.model;

import jakarta.persistence.*;

@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int floor;

    private int number;

    private boolean isAvailable;

    private int hotelId;
}
