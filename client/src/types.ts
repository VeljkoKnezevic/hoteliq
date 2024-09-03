export type HotelCardVariants = "nearby" | "popular";
export type Authorities = "GUEST" | "STAFF";

export type ProfileInfo = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type TRegister = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  guest: {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    reservation?: string;
    authorities: [
      {
        id: number;
        authority: string;
      },
    ];
  };
  jwt: string;
};

export type localStorageUser = {
  user: {
    guest: {
      id: number;
      email: string;
      firstName?: string;
      lastName?: string;
      reservation?: string;
      authorities: [
        {
          id: number;
          authority: string;
        },
      ];
    };
    jwt: string;
  };
};

export type TParsedToken = {
  iat: number;
  iss: string;
  roles: string;
  sub: string;
};

export type THotel = {
  id: number;
  name: string;
  address: string;
  location: string;
  rating: number;
  price: string;
};
