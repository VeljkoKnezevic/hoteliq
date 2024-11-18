import {
  Calendar,
  CalendarReserved,
  CalendarSelected,
} from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { dateConverter } from "../misc/Helpers";
import { TReservation, TRoom } from "../types";
import HotelRooms from "./HotelRooms";

const BookingPopup = () => {
  const { id: hotelID } = useParams();
  const { getUser } = useAuth();
  const queryClient = useQueryClient();

  const [selectedDates, setSelectedDays] = useState<CalendarSelected[]>([]);

  const [updatedRoom, setUpdatedRoom] = useState<TRoom | undefined>();
  const [selectedRoom, setSelectedRoom] = useState<TRoom>({
    floor: 0,
    isAvailable: false,
    number: 0,
    roomType: {
      id: 1,
    },
  });
  const [reservation, setReservation] = useState<TReservation>({
    startDate: 0,
    endDate: 0,
    guestId: 0,
    hotelId: 0,
    roomId: 0,
  });

  const getReservations = async (hotelId: number) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/reservations/${hotelId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  };

  const { data: reservationData } = useQuery<TReservation[]>({
    queryKey: ["reservations"],
    queryFn: () => getReservations(Number(hotelID)),
  });

  const reserved: CalendarReserved[] =
    reservationData?.map((data) => ({
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    })) || [];

  const addReservation = async (reservation: TReservation) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/reservations`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getUser()?.user.jwt}`,
        },
        body: JSON.stringify(reservation),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  };
  const addReservationMutation = useMutation({
    mutationFn: addReservation,
    onSuccess: () => {
      console.log("Reservation added successfully");
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
    onError: (error) => {
      console.error("Error when making a reservation:", error);
    },
  });

  useEffect(() => {
    if (reservation.startDate !== null && reservation.startDate !== 0) {
      addReservationMutation.mutate(reservation, {
        onSuccess: () => {
          setUpdatedRoom(selectedRoom);
        },
        onError: (err) => {
          console.log("Error setting the updated room: ", err);
        },
      });
    }
  }, [reservation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const guestId = getUser()?.user.guest.id;

    const { convertedStartDate, convertedEndDate } = dateConverter(
      selectedDates[0],
      selectedDates[1]
    );

    setReservation({
      startDate: convertedStartDate,
      endDate: isNaN(convertedEndDate) ? convertedStartDate : convertedEndDate,
      roomId: selectedRoom.id ?? 0,
      hotelId: Number(hotelID),
      guestId: guestId ?? 0,
    });

    setSelectedRoom((prev) => ({
      ...prev,
      isAvailable: false,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="mb-4 mt-4 text-base font-bold text-text-black md:text-lg xl:text-xl">
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
      {selectedDates.length !== 0 && (
        <>
          <HotelRooms
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            authorities="GUEST"
            hotelId={Number(hotelID)}
            updatedRoom={updatedRoom}
          />
          <button
            className="mt-3 w-full rounded-xl bg-primary-blue py-4 text-sm font-bold text-[#fff] md:mt-6  md:text-base lg:mt-8 xl:mt-10 xl:py-6"
            type="submit"
          >
            Make reservation
          </button>
        </>
      )}
      {selectedDates.length === 0 && (
        <p>First, select a date, and then hotels will appear.</p>
      )}
    </form>
  );
};

export default BookingPopup;
