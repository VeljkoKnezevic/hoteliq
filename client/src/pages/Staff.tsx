import { useState } from "react";
import Header from "../components/Header";
import StaffGuests from "../containers/StaffGuests";
import StaffHotels from "../containers/StaffHotels";
import { THotel, TRoom } from "../types";

const Staff = () => {
  const [hotelSearch, setHotelSearch] = useState<string>("");
  const [userSearch, setUserSearch] = useState<string>("");
  const [newHotelData, setNewHotelData] = useState<THotel>({
    name: "",
    address: "",
    location: "Spain",
    price: "",
    rating: 0.0,
  });

  const [updateHotelData, setUpdateHotelData] = useState<THotel>({
    name: "",
    address: "",
    location: "",
    price: "",
    rating: 0.0,
  });

  const [addRoomData, setAddRoomData] = useState<TRoom>({
    floor: 0,
    number: 0,
    roomType: {
      id: 0,
    },
    isAvailable: true,
  });

  return (
    <>
      <Header />
      <main className="mx-6 mb-6 md:mx-10 xl:mx-auto xl:max-w-[1200px] 2xl:max-w-[1440px]">
        <h2 className="mt-3 text-2xl text-secondary-blue underline">
          Staff page
        </h2>

        <StaffGuests userSearch={userSearch} setUserSearch={setUserSearch} />

        <StaffHotels
          hotelSearch={hotelSearch}
          setHotelSearch={setHotelSearch}
          newHotelData={newHotelData}
          setNewHotelData={setNewHotelData}
          updateHotelData={updateHotelData}
          setUpdateHotelData={setUpdateHotelData}
          addRoomData={addRoomData}
          setAddRoomData={setAddRoomData}
        />
      </main>
    </>
  );
};

export default Staff;
