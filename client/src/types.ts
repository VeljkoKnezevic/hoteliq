export type HotelCardVariants = "nearby" | "popular";

export type ProfileInfo = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type THotel = {
  id: number;
  name: string;
  address: string;
  location: string;
  rating: number;
  price: string;
};
