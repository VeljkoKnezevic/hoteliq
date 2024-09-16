import {
  Calendar,
  CalendarReserved,
  CalendarSelected,
} from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import { useState } from "react";
import HotelRooms from "./HotelRooms";
import { useParams } from "react-router-dom";

const BookingPopup = () => {
  const { id } = useParams();

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
    <form>
      <h4 className="mt-3 text-base font-bold text-text-black md:text-lg xl:text-xl">
        Pick a date
      </h4>
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
      <h4 className="mt-3 text-base font-bold text-text-black md:text-lg xl:text-xl">
        Pick a room
      </h4>
      <HotelRooms authorities="GUEST" hotelId={Number(id)} />
      <button
        className="mt-3 w-full rounded-xl bg-primary-blue py-4 text-sm font-bold text-[#fff] md:mt-6  md:text-base lg:mt-8 xl:mt-10 xl:py-6"
        type="submit"
      >
        Make reservation
      </button>
    </form>
  );
};

export default BookingPopup;
