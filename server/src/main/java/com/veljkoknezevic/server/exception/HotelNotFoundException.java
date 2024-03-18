package com.veljkoknezevic.server.exception;

import java.util.function.Supplier;

public class HotelNotFoundException extends RuntimeException {

    public HotelNotFoundException(int id) {
        super("Hotel not found with id: " + id);
    }
}
