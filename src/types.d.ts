export  interface IDish {
  title: string;
  price: number;
  image: string;
}

export interface IDishFromDB extends IDish {
  id: string;
}

export interface IOrderFromDB {
  id?: string;
  orders: { [key: string]: number };
  customer: {
    name: string;
    address: string;
    phone: string;
  }
  delivery: number;
  totalPrice: number;
}

export interface IOrder {
  [key: string]: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}
