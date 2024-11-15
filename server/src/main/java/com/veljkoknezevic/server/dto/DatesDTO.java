package com.veljkoknezevic.server.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;

import java.util.Date;

public class DatesDTO {

    @NotBlank(message = "Start date is required")
    private Date startDate;
    @NotBlank(message = "End date is required")
    @Future(message = "End date must be a future date")
    private Date endDate;

    public DatesDTO() {
    }

    public DatesDTO(Date startDate, Date endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
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
}
