import { useQuery } from "@tanstack/react-query";
import { TRoom } from "../types";
import { v4 as uuidv4 } from "uuid";

type THotelRooms = {
  hotelId: number;
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

const HotelRooms = ({ hotelId }: THotelRooms) => {
  const { data: roomData } = useHotelRooms(hotelId);

  if (roomData?.length === 0) {
    return <p>No rooms at this hotel</p>;
  }
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
};

export default HotelRooms;
