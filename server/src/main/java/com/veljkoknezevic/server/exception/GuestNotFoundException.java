package com.veljkoknezevic.server.exception;

public class GuestNotFoundException extends RuntimeException {

    public GuestNotFoundException(String email) {
        super("Guest with email: " + email + " not found");
    }

    public GuestNotFoundException(int id) {
        super("Guest with id: " + id + " not found");
    }
}
