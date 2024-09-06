package com.veljkoknezevic.server.dto;

import java.util.Date;

public record ReservationDTO(Date startDate, Date endDate, int hotelId, int roomId) {
}
