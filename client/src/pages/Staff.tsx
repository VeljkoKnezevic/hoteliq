import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { ProfileInfo, THotel } from "../types";
import HotelCard from "../components/HotelCard";

const Staff = () => {
  const [search, setSearch] = useState<string>("");
  const [userSearch, setUserSearch] = useState<string>("");

  // Guests
  const getGuests = async () => {
    const response = await fetch("http://localhost:8080/guests", {
      headers: {
        "Content-type": "application/json",
      },
    });

    return await response.json();
  };
  const guests = useQuery<any[]>({
    queryKey: ["guests"],
    queryFn: getGuests,
  });

  const deleteGuest = () => {};
  // Hotels
  const getHotels = async () => {
    const response = await fetch("http://localhost:8080/hotels", {
      headers: {
        "Content-type": "application/json",
      },
    });
    return await response.json();
  };

  const hotels = useQuery<THotel[]>({
    queryKey: ["hotels"],
    queryFn: getHotels,
  });

  const addHotel = () => {};
  const updateHotel = () => {};
  const deleteHotel = () => {};
  // Resrevations
  const getReservations = () => {};
  const getReservationsFromGuest = () => {};

  return (
    <div>
      <Header />
      <main className="mx-6 md:mx-10 xl:mx-auto xl:max-w-[1200px] 2xl:max-w-[1440px]">
        <h2>Staff page</h2>

        <div>
          <h3>Guests</h3>
          <button>Add new</button>
        </div>
        <section>
          <input
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            type="text"
            className=" mb-5 mt-5 w-full rounded-lg border-2 border-secondary-grey bg-[url('/search.svg')] bg-[center_left_0.5rem] bg-no-repeat py-3 pl-8 text-sm font-medium xl:mt-6"
            placeholder="Search Users by Email"
          />
          {guests.data &&
            guests.data
              .filter((guest: ProfileInfo) => guest.email.includes(userSearch))
              .slice(0, 6)
              .map((guest: ProfileInfo) => {
                return (
                  <div key={guest.id}>
                    <div>{guest.email}</div>
                  </div>
                );
              })}
        </section>

        <div>
          <h3>Hotels</h3>
          <button>Add new</button>
        </div>

        <section>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className=" mb-5 mt-5 w-full rounded-lg border-2 border-secondary-grey bg-[url('/search.svg')] bg-[center_left_0.5rem] bg-no-repeat py-3 pl-8 text-sm font-medium xl:mt-6"
            placeholder="Search Hotel"
          />
          <div>
            {hotels.data &&
              hotels.data
                .filter((hotel) =>
                  hotel.name?.toLowerCase().includes(search.toLowerCase())
                )
                .slice(0, 6)
                .map((hotel) => {
                  return (
                    <div
                      className="mb-2 rounded-lg border-2 border-secondary-grey hover:border-secondary-blue hover:bg-secondary-grey"
                      key={hotel.id}
                    >
                      <HotelCard data={hotel} variant="popular" />
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  );
                })}
          </div>
        </section>

        <div>
          <h3>Reservations</h3>
          <button>Add new</button>
        </div>
      </main>
    </div>
  );
};

export default Staff;
