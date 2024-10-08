package com.veljkoknezevic.server.dto;

import java.util.Date;
import java.util.Objects;

public final class ReservationDTO {
    private Date startDate;
    private Date endDate;
    private int hotelId;
    private int roomId;
    private int guestId;

    public ReservationDTO(Date startDate, Date endDate, int hotelId, int roomId, int guestId) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.hotelId = hotelId;
        this.roomId = roomId;
        this.guestId = guestId;
    }

    public ReservationDTO() {
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getHotelId() {
        return hotelId;
    }

    public void setHotelId(int hotelId) {
        this.hotelId = hotelId;
    }

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public int getGuestId() {
        return guestId;
    }

    public void setGuestId(int guestId) {
        this.guestId = guestId;
    }


    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null || obj.getClass() != this.getClass()) return false;
        var that = (ReservationDTO) obj;
        return Objects.equals(this.startDate, that.startDate) &&
                Objects.equals(this.endDate, that.endDate) &&
                this.hotelId == that.hotelId &&
                this.roomId == that.roomId &&
                this.guestId == that.guestId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(startDate, endDate, hotelId, roomId, guestId);
    }

    @Override
    public String toString() {
        return "ReservationDTO[" +
                "startDate=" + startDate + ", " +
                "endDate=" + endDate + ", " +
                "hotelId=" + hotelId + ", " +
                "roomId=" + roomId + ", " +
                "guestId=" + guestId + ']';
    }

}
