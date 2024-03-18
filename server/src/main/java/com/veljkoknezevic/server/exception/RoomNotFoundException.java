package com.veljkoknezevic.server.exception;

public class RoomNotFoundException extends RuntimeException{

    public RoomNotFoundException(int id) {
        super("Room not found with id: " + id);
    }

}
