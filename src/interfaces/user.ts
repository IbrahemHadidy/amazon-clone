export default interface User {
  id: number;
  name: string;
  identifier: string;
  password: string;
  cart: number[];
  wishlist: number[];
}
