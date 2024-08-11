export type HotelCardVariants = "nearby" | "popular";

export type ProfileInfo = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type THotel = {
  id: number;
  name: string;
  address: string;
  location: string;
};
