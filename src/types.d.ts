export  interface IDish {
  title: string;
  price: number;
  image: string;
}

export interface IDishFromDB extends IDish {
  id: string;
}