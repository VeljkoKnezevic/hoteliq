import {
  Calendar,
  CalendarReserved,
  CalendarSelected,
} from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import { useState } from "react";

const BookingCalendar = () => {
  const [selectedDates, setSelectedDays] = useState<CalendarSelected[]>([]);

  const reserved: CalendarReserved[] = Array.from({ length: 2 }, () => {
    const startDate = new Date(
      "Tue Sep 17 2024 00:00:00 GMT+0200 (Central European Summer Time)"
    );
    const endDate = new Date(
      "Thu Sep 19 2024 00:00:00 GMT+0200 (Central European Summer Time)"
    );

    return {
      startDate: startDate,
      endDate: endDate,
    };
  });

  return (
    <Calendar
      range
      protection
      reserved={reserved}
      selected={selectedDates}
      onChange={setSelectedDays}
      onOverbook={(date, type) =>
        alert(
          `${type} on date: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}.`
        )
      }
    />
  );
};

export default BookingCalendar;
