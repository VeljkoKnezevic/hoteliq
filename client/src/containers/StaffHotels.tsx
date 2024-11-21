import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { THotel, TRoom } from "../types";
import { handleInputChange } from "../misc/Helpers";
import HotelCard from "../components/HotelCard";
import Popup from "reactjs-popup";
import HotelRooms from "./HotelRooms";
import { SetStateAction } from "react";
import { useAuth } from "../context/AuthContext";

type TStaffHotels = {
  hotelSearch: string;
  setHotelSearch: React.Dispatch<SetStateAction<string>>;
  newHotelData: THotel;
  setNewHotelData: React.Dispatch<SetStateAction<THotel>>;
  updateHotelData: THotel;
  setUpdateHotelData: React.Dispatch<SetStateAction<THotel>>;
  addRoomData: TRoom;
  setAddRoomData: React.Dispatch<SetStateAction<TRoom>>;
};

const StaffHotels = ({
  hotelSearch,
  setHotelSearch,
  newHotelData,
  setNewHotelData,
  updateHotelData,
  setUpdateHotelData,
  addRoomData,
  setAddRoomData,
}: TStaffHotels) => {
  const queryClient = useQueryClient();
  const { getUser } = useAuth();

  // Hotels
  const getHotels = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/hotels`, {
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  };

  const {
    error: hotelsError,
    isLoading: hotelsLoading,
    data: hotelsData,
  } = useQuery<THotel[]>({
    queryKey: ["hotels"],
    queryFn: getHotels,
  });

  const addHotel = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/hotels`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getUser()?.user.jwt}`,
      },
      body: JSON.stringify(newHotelData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  };

  const addHotelMutation = useMutation({
    mutationFn: addHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
      console.log("Hotel added successfully");
    },
    onError: (error) => {
      console.error("Error when adding hotel:", error);
    },
  });

  const handleAddHotelSubmitButton = (e: React.FormEvent) => {
    e.preventDefault();

    addHotelMutation.mutate();
  };

  const updateHotel = async (id: number) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/hotels/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getUser()?.user.jwt}`,
        },
        body: JSON.stringify(updateHotelData),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  };

  const updateHotelMutation = useMutation({
    mutationFn: updateHotel,
    onSuccess: () => {
      console.log("Successfully updated hotel");
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
    },
    onError: (err) => {
      console.error("Hotel update unsuccessful: ", err);
    },
  });

  const handleEditHotelSubmit = (e: React.FormEvent, hotel: THotel) => {
    e.preventDefault();

    if (hotel.id) updateHotelMutation.mutate(hotel.id);
  };

  const deleteHotel = async (id: number) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/hotels/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getUser()?.user.jwt}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  };

  const deleteHotelMutation = useMutation({
    mutationFn: deleteHotel,
    onSuccess: () => {
      console.log("Successfully deleted hotel");
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
    },
    onError: (err) => {
      console.error("Hotel deletion unsuccessful: ", err);
    },
  });

  const handleHotelDeleteClick = (hotel: THotel) => {
    if (
      confirm(`Are you sure you want to delete hotel with id: ${hotel.id} `)
    ) {
      if (hotel.id) deleteHotelMutation.mutate(hotel.id);
    } else {
      return;
    }
  };

  // Rooms

  const addRoom = async (hotelId: number) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/hotels/${hotelId}/rooms`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getUser()?.user.jwt}`,
        },
        body: JSON.stringify({ hotelId, ...addRoomData }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  };

  const addRoomMutation = useMutation({
    mutationFn: addRoom,
    onSuccess: () => {
      console.log("Successfully added room");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (err) => {
      console.log("Failed to add room: ", err);
    },
  });

  const handleAddRoomSubmit = (e: React.FormEvent, hotelId: number) => {
    e.preventDefault();
    if (hotelId) addRoomMutation.mutate(hotelId);
  };

  if (hotelsLoading) {
    return <p>Loading...</p>;
  }
  if (hotelsError) {
    return <p>Error loading hotels: {hotelsError.message}</p>;
  }

  return (
    <>
      <div className="mt-6 flex justify-between">
        <h3 className="text-2xl text-secondary-blue">Hotels</h3>

        <Popup
          trigger={
            <button className="rounded-lg bg-secondary-blue px-4 py-1 text-lg text-[#fff]">
              Add new
            </button>
          }
          modal
        >
          <section className="flex  flex-col items-center">
            <h3 className="mb-3 mt-3 text-2xl text-primary-blue underline ">
              Enter Data for the hotel
            </h3>
            <form
              onSubmit={handleAddHotelSubmitButton}
              className="flex w-auto flex-col "
            >
              <label
                htmlFor="name"
                className="mt-2 text-base font-medium text-secondary-blue"
              >
                Name
              </label>
              <input
                className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black "
                type="text"
                name="name"
                id="name"
                value={newHotelData.name}
                onChange={(e) => handleInputChange(e, setNewHotelData)}
              />
              <label
                htmlFor="address"
                className="mt-2 text-base font-medium text-secondary-blue"
              >
                Address
              </label>
              <input
                className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black "
                type="text"
                name="address"
                id="address"
                value={newHotelData.address}
                onChange={(e) => handleInputChange(e, setNewHotelData)}
              />
              <label
                htmlFor="location"
                className="mt-2 text-base font-medium text-secondary-blue"
              >
                Location
              </label>
              <select
                onChange={(e) => handleInputChange(e, setNewHotelData)}
                name="location"
                id="location"
                className="w-1/2 text-sm font-medium text-text-black lg:text-lg"
                defaultValue={0}
              >
                <option value="Spain">Spain</option>
                <option value="Australia">Australia</option>
              </select>
              <label
                htmlFor="rating"
                className="mt-2 text-base font-medium text-secondary-blue"
              >
                Rating
              </label>
              <input
                className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black "
                type="text"
                name="rating"
                id="rating"
                value={newHotelData.rating}
                onChange={(e) => handleInputChange(e, setNewHotelData)}
              />
              <label
                htmlFor="price"
                className="mt-2 text-base font-medium text-secondary-blue"
              >
                Price
              </label>
              <input
                className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black "
                type="text"
                name="price"
                id="price"
                value={newHotelData.price}
                onChange={(e) => handleInputChange(e, setNewHotelData)}
              />
              <button
                type="submit"
                className="mt-5 rounded-lg bg-secondary-blue px-4 py-1 text-lg text-[#fff]"
              >
                Add hotel
              </button>
            </form>
          </section>
        </Popup>
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
                      <Popup
                        trigger={
                          <button className="rounded  bg-primary-blue p-2 text-base font-medium text-[#fff]">
                            Edit hotel
                          </button>
                        }
                        modal
                        onOpen={() => setUpdateHotelData({ ...hotel })}
                      >
                        <section className="flex  flex-col items-center">
                          <h3 className="mb-3 mt-3 text-2xl text-primary-blue underline ">
                            Update data for the hotel
                          </h3>
                          <form
                            onSubmit={(e) => handleEditHotelSubmit(e, hotel)}
                            className="flex w-auto flex-col "
                          >
                            <label
                              htmlFor="name"
                              className="mt-2 text-base font-medium text-secondary-blue"
                            >
                              Name
                            </label>
                            <input
                              className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black "
                              type="text"
                              name="name"
                              id="name"
                              value={updateHotelData.name}
                              onChange={(e) =>
                                handleInputChange(e, setUpdateHotelData)
                              }
                            />
                            <label
                              htmlFor="address"
                              className="mt-2 text-base font-medium text-secondary-blue"
                            >
                              Address
                            </label>
                            <input
                              className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black "
                              type="text"
                              name="address"
                              id="address"
                              value={updateHotelData.address}
                              onChange={(e) =>
                                handleInputChange(e, setUpdateHotelData)
                              }
                            />
                            <label
                              htmlFor="location"
                              className="mt-2 text-base font-medium text-secondary-blue"
                            >
                              Location
                            </label>
                            <select
                              onChange={(e) =>
                                handleInputChange(e, setUpdateHotelData)
                              }
                              name="location"
                              id="location"
                              className="w-1/2 text-sm font-medium text-text-black lg:text-lg"
                              value={updateHotelData.location}
                            >
                              <option value="Spain">Spain</option>
                              <option value="Australia">Australia</option>
                            </select>
                            <label
                              htmlFor="rating"
                              className="mt-2 text-base font-medium text-secondary-blue"
                            >
                              Rating
                            </label>
                            <input
                              className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black "
                              type="text"
                              name="rating"
                              id="rating"
                              value={updateHotelData.rating}
                              onChange={(e) =>
                                handleInputChange(e, setUpdateHotelData)
                              }
                            />
                            <label
                              htmlFor="price"
                              className="mt-2 text-base font-medium text-secondary-blue"
                            >
                              Price
                            </label>
                            <input
                              className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black "
                              type="text"
                              name="price"
                              id="price"
                              value={updateHotelData.price}
                              onChange={(e) =>
                                handleInputChange(e, setUpdateHotelData)
                              }
                            />
                            <button
                              type="submit"
                              className="mt-5 rounded-lg bg-secondary-blue px-4 py-1 text-lg text-[#fff]"
                            >
                              Update hotel
                            </button>
                          </form>
                        </section>
                      </Popup>

                      <Popup
                        trigger={
                          <button className="rounded  bg-primary-blue p-2 text-base font-medium text-[#fff]">
                            Add room
                          </button>
                        }
                        modal
                      >
                        <section className="flex  flex-col items-center">
                          <h3 className="mb-3 mt-3 text-2xl text-primary-blue underline ">
                            Add a Room to {hotel.name}
                          </h3>
                          <form
                            onSubmit={(e) =>
                              handleAddRoomSubmit(e, hotel.id ?? 0)
                            }
                            className="flex w-auto flex-col "
                          >
                            <label
                              htmlFor="floor"
                              className="mt-2 text-base font-medium text-secondary-blue"
                            >
                              Floor
                            </label>
                            <input
                              className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black "
                              type="text"
                              name="floor"
                              id="floor"
                              value={addRoomData.floor}
                              onChange={(e) =>
                                handleInputChange(e, setAddRoomData)
                              }
                            />
                            <label
                              htmlFor="number"
                              className="mt-2 text-base font-medium text-secondary-blue"
                            >
                              Number
                            </label>
                            <input
                              className="mt-1 rounded border border-primary-blue p-2 text-sm font-medium text-text-black "
                              type="text"
                              name="number"
                              id="number"
                              value={addRoomData.number}
                              onChange={(e) =>
                                handleInputChange(e, setAddRoomData)
                              }
                            />
                            <label
                              htmlFor="roomType"
                              className="mt-2 text-base font-medium text-secondary-blue"
                            >
                              Room Type
                            </label>
                            <select
                              name="roomType"
                              id="roomType"
                              className="w-1/2 text-sm font-medium text-text-black lg:text-lg"
                              value={addRoomData.roomType.id}
                              onChange={(e) => {
                                console.log(e.target.value);
                                setAddRoomData((prev) => ({
                                  ...prev,
                                  roomType: {
                                    id: Number(e.target.value),
                                  },
                                }));
                              }}
                            >
                              <option value="1">Single</option>
                              <option value="2">Double</option>
                              <option value="3">Triple</option>
                            </select>
                            <label
                              htmlFor="isAvailable"
                              className="mt-2 text-base font-medium text-secondary-blue"
                            >
                              Is Available
                            </label>
                            <input
                              id="isAvailable"
                              name="isAvailable"
                              type="checkbox"
                              checked={addRoomData.isAvailable}
                              onChange={() =>
                                setAddRoomData((prev) => ({
                                  ...prev,
                                  isAvailable: !prev.isAvailable,
                                }))
                              }
                              className="mr-auto mt-2 h-6 w-6 cursor-pointer rounded-full "
                            />
                            <button
                              type="submit"
                              className="mt-5 rounded-lg bg-secondary-blue px-4 py-1 text-lg text-[#fff]"
                            >
                              Add room
                            </button>
                          </form>
                        </section>
                      </Popup>
                      <Popup
                        trigger={
                          <button className="rounded  bg-primary-blue p-2 text-base font-medium text-[#fff]">
                            Check rooms
                          </button>
                        }
                        modal
                      >
                        <section>
                          <h3 className="mb-3 mt-3 text-2xl text-primary-blue underline ">
                            Rooms for {hotel.name}
                          </h3>
                          <HotelRooms
                            authorities="STAFF"
                            hotelId={hotel.id ?? 0}
                          />
                        </section>
                      </Popup>
                      <button
                        onClick={() => handleHotelDeleteClick(hotel)}
                        className="ml-auto rounded border-2 border-text-black bg-secondary-grey p-2 text-base font-medium text-[#f00]"
                      >
                        Delete hotel
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      </section>
    </>
  );
};

export default StaffHotels;
