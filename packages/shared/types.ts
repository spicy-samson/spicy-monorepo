// User roles for the app
export type Role = "customer" | "admin" | "seller";
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface User {
  fullName: string;
  email: string;
  createdAt: Date;
  photoURL: string;
  uid: string;
  role: Role;
}
