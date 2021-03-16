export type User = {
  gender: "male" | "female";
  name: {
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    postcode: number | string;
  };
  email: string;
  login: {
    uuid: string;
    username: string;
  };
  phone: string;
  cell: string;
  picture: {
    thumbnail: string;
    large: string;
  };
  nat: string;
};

export type UserData = {
  data: {
    results: User[];
  };
};

export type NatSet = ("CH" | "ES" | "FR" | "GB")[];
