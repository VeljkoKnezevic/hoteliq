package com.veljkoknezevic.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HotelNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleHotelNotFoundException(HotelNotFoundException exception) {
        ErrorResponse errorResponse = ErrorResponse.builder(exception, HttpStatusCode.valueOf(404), exception.getMessage()).build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(RoomNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleRoomNotFoundException(RoomNotFoundException exception) {
        ErrorResponse errorResponse = ErrorResponse.builder(exception, HttpStatusCode.valueOf(404), exception.getMessage()).build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(ReservationNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleReservationNotFound(ReservationNotFoundException exception) {
        ErrorResponse errorResponse = ErrorResponse.builder(exception, HttpStatusCode.valueOf(404), exception.getMessage()).build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(GuestNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleGuestNotFoundException(GuestNotFoundException exception) {
        ErrorResponse errorResponse = ErrorResponse.builder(exception, HttpStatusCode.valueOf(404), exception.getMessage()).build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

}
