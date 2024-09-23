import { useQuery } from "@tanstack/react-query";
import { Authorities, TRoom } from "../types";
import { v4 as uuidv4 } from "uuid";
import { translateRoomType } from "../misc/Helpers";
import { SetStateAction } from "react";

type THotelRooms = {
  hotelId: number;
  authorities: Authorities;
  selectedRoom: TRoom;
  setSelectedRoom?: React.Dispatch<SetStateAction<TRoom>>;
};

const getRoomForHotel = async (hotelId: number) => {
  try {
    const response = await fetch(
      `http://localhost:8080/hotels/${hotelId}/rooms`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          // Authorization: `Bearer ${getUser()?.user.jwt}`,
        },
      }
    );

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const useHotelRooms = (hotelId: number) => {
  return useQuery<TRoom[]>({
    queryFn: () => getRoomForHotel(hotelId),
    queryKey: ["rooms", hotelId],
  });
};

const HotelRooms = ({
  hotelId,
  authorities,
  setSelectedRoom,
  selectedRoom,
}: THotelRooms) => {
  const { data: roomData } = useHotelRooms(hotelId);

  if (roomData?.length === 0) {
    return <p>No rooms at this hotel</p>;
  }

  if (authorities === "GUEST") {
    return (
      <section className="flex flex-col gap-4">
        {roomData
          ?.filter((room) => room.isAvailable)
          .map((room) => {
            return (
              <button
                className={`flex text-start ${selectedRoom === room ? "border-4" : ""} justify-between border-2 border-primary-blue px-6 py-4 first:mt-5`}
                key={uuidv4()}
                onClick={() => setSelectedRoom && setSelectedRoom(room)}
              >
                <div>
                  <h4 className="text-sm font-bold text-text-black md:text-base lg:text-lg xl:text-xl">
                    Number{" "}
                  </h4>
                  <p className="text-base font-bold text-primary-blue">
                    {room.number}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-black md:text-base lg:text-lg xl:text-xl">
                    Floor
                  </h4>
                  <p className="text-base font-bold text-primary-blue">
                    {room.floor}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-black md:text-base lg:text-lg xl:text-xl">
                    Type
                  </h4>
                  <p className="text-base font-bold text-primary-blue">
                    {translateRoomType(room.roomType.id)}
                  </p>
                </div>
              </button>
            );
          })}
      </section>
    );
  } else {
    return (
      <section className="flex flex-col gap-4">
        {roomData?.map((room) => {
          return (
            <div className=" border-2 border-text-black" key={uuidv4()}>
              <p>
                Room number: {room.number}, floor: {room.floor}
              </p>
              <p>Available: {room.isAvailable ? "yes" : "no"}</p>
            </div>
          );
        })}
      </section>
    );
  }
};

export default HotelRooms;
