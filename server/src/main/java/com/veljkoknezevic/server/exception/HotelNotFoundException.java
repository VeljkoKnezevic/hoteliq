package com.veljkoknezevic.server.exception;

public class HotelNotFoundException extends RuntimeException{

    public HotelNotFoundException(int id) {
        super("Hotel not found with id: " + id);
    }
}
