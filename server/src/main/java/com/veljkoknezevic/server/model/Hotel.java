package com.veljkoknezevic.server.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Random;

@Entity
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Hotel name is required")
    @Size(min = 3, max = 70, message = "Hotel name must be between 3 and 70 characters")
    private String name;

    @NotBlank(message = "Address is required")
    @Size(min = 3, max = 70, message = "Address must be between 3 and 70 characters")
    private String address;

    @NotBlank(message = "Location is required")
    @Size(min = 3, max = 70, message = "Location must be between 3 and 70 characters")
    private String location;

    @NotNull(message = "Rating is required")
    @DecimalMin(value = "1.0", message = "Rating must be at least 1.0")
    @DecimalMax(value = "5.0", message = "Rating must not exceed 5.0")
    private Double rating;

    @NotBlank(message = "Price is required")
    private String price;

    @OneToMany(mappedBy = "hotel")
    @JsonManagedReference
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

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
       this.price = price;
    }
}
