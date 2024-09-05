import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Header from "../components/Header";
import HotelCard from "../components/HotelCard";
import { ProfileInfo, THotel } from "../types";

const Staff = () => {
  const queryClient = useQueryClient();

  const [hotelSearch, setHotelSearch] = useState<string>("");
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
  const { data: guestsData } = useQuery<ProfileInfo[]>({
    queryKey: ["guests"],
    queryFn: getGuests,
  });

  const deleteGuest = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/guests/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: deleteGuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      console.log("Guest deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting guest:", error);
    },
  });

  const handleDeleteClick = (id: number | null) => {
    if (id) {
      if (confirm(`Are you sure you want to delete user with id: ${id} `)) {
        deleteMutation.mutate(id);
      } else {
        return;
      }
    }
  };

  // Hotels
  const getHotels = async () => {
    const response = await fetch("http://localhost:8080/hotels", {
      headers: {
        "Content-type": "application/json",
      },
    });
    return await response.json();
  };

  const { data: hotelsData } = useQuery<THotel[]>({
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
    <>
      <Header />
      <main className="mx-6 mb-6 md:mx-10 xl:mx-auto xl:max-w-[1200px] 2xl:max-w-[1440px]">
        <h2 className="mt-3 text-2xl text-secondary-blue underline">
          Staff page
        </h2>

        {/* Guests */}
        <div className="mt-6 flex justify-between">
          <h3 className="text-2xl text-secondary-blue">Guests</h3>
        </div>
        <section>
          <input
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            type="text"
            className=" mb-5 mt-5 w-full rounded-lg border-2 border-secondary-grey bg-[url('/search.svg')] bg-[center_left_0.5rem] bg-no-repeat py-3 pl-8 text-sm font-medium xl:mt-6"
            placeholder="Search Users by Email"
          />
          {guestsData &&
            guestsData
              .filter((guest: ProfileInfo) =>
                guest.email?.toLowerCase().includes(userSearch.toLowerCase())
              )
              .slice(0, 6)
              .map((guest: ProfileInfo) => {
                return (
                  <div
                    className="mb-2 rounded-lg border-2 border-secondary-grey "
                    key={guest.id}
                  >
                    <div className="flex justify-between px-2">
                      <span className="font-normal">
                        {guest.firstName ?? "_____"} {guest.lastName ?? "_____"}
                        , {guest.email}
                      </span>
                      <button
                        onClick={() =>
                          handleDeleteClick(guest.id ? guest.id : null)
                        }
                        className="text-[#f00]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
        </section>

        {/* Hotels */}
        <div className="mt-6 flex justify-between">
          <h3 className="text-2xl text-secondary-blue">Hotels</h3>
          <button className="rounded-lg bg-secondary-blue px-4 py-1 text-lg text-[#fff]">
            Add new
          </button>
        </div>
        <section>
          <input
            value={hotelSearch}
            onChange={(e) => setHotelSearch(e.target.value)}
            type="text"
            className=" mb-5 mt-5 w-full rounded-lg border-2 border-secondary-grey bg-[url('/search.svg')] bg-[center_left_0.5rem] bg-no-repeat py-3 pl-8 text-sm font-medium xl:mt-6"
            placeholder="Search Hotel"
          />
          <div>
            {hotelsData &&
              hotelsData
                .filter((hotel) =>
                  hotel.name?.toLowerCase().includes(hotelSearch.toLowerCase())
                )
                .slice(0, 4)
                .map((hotel) => {
                  return (
                    <div
                      className="mb-2 rounded-lg border-2 border-secondary-grey hover:border-secondary-blue hover:bg-secondary-grey"
                      key={hotel.id}
                    >
                      <HotelCard data={hotel} variant="popular" />
                      <div className="flex gap-4 p-2">
                        <button className="rounded  bg-primary-blue p-2 text-base font-medium text-[#fff]">
                          Edit
                        </button>
                        <button className="rounded border-2 border-text-black bg-secondary-grey p-2 text-base font-medium text-[#f00]">
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
          </div>
        </section>

        {/* Reservations */}
        <div className="mt-6 flex justify-between">
          <h3 className="text-2xl text-secondary-blue">Reservations</h3>
        </div>
      </main>
    </>
  );
};

export default Staff;
