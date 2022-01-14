export interface User {
  username: string;
  email: string;
}

export interface Genre {
  name: string;
  id: number;
}

export interface Show {
  id: number;
  name: string;
  description: string;
  image_potrait: string;
  image_wide: string;
  director: string;
  rating: string;
  genres: Genre[];
  year: number;
}

export interface Auth {
  status: boolean;
  message: string;
  token?: string;
  user?: User;
}
