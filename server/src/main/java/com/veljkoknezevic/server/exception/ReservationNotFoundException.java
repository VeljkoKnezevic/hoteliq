package com.veljkoknezevic.server.exception;

public class ReservationNotFoundException extends RuntimeException{

    public ReservationNotFoundException() {
        super("No reservations found for this guest");
    }
}
