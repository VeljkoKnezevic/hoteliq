package com.veljkoknezevic.server.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Random;

@Entity
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String address;

    private String location;

    private Double rating;

    private String price;

    @OneToMany(mappedBy = "hotel")
    public List<Room> room;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<Room> getRoom() {
        return room;
    }

    public void setRoom(List<Room> room) {
        this.room = room;
    }


    public Double getRating() {
        return rating;
    }

    public void setRating() {
        Random random = new Random();

        double min = 1.0;
        double max = 5.0;

        double randomDouble = min + (max - min) * random.nextDouble();

        this.rating = Math.round(randomDouble * 10.0) / 10.0;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice() {
        Random random = new Random();
        double min = 80.0;
        double max = 200.0;
        double randomDouble = min + (max - min) * random.nextDouble();
        double roundedDouble = Math.round(randomDouble * 10.0) / 10.0;

        this.price = (roundedDouble % 1 == 0) ? String.format("%.0f", roundedDouble): String.format("%.1f", roundedDouble);
    }
}
