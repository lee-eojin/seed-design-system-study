export interface CartProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export const mockCartItems: CartProduct[] = [
  {
    id: 1,
    name: "나이키 에어맥스 90",
    price: 89000,
    imageUrl: "https://picsum.photos/seed/shoe1/200/200",
    quantity: 1,
  },
  {
    id: 2,
    name: "아디다스 삼바 OG",
    price: 35000,
    imageUrl: "https://picsum.photos/seed/shoe2/200/200",
    quantity: 1,
  },
  {
    id: 3,
    name: "뉴발란스 990v6",
    price: 25000,
    imageUrl: "https://picsum.photos/seed/shoe3/200/200",
    quantity: 1,
  },
];
