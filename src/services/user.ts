import type UserType from '@interfaces/user';

class User {
  users: UserType[];

  constructor() {
    this.users = [];
    this.#syncUsers();
  }

  #syncUsers() {
    this.users = JSON.parse(localStorage.getItem('users') ?? '[]') || [];
  }

  #saveUsers(id?: number) {
    localStorage.setItem('users', JSON.stringify(this.users));

    if (id) {
      const user = this.users.find((u) => u.id === id);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    }
  }

  #getUserById(id: number): UserType {
    if (!id) throw new Error('User ID is required');

    const user = this.users.find((user) => user.id === id);
    if (!user) throw new Error('User not found');

    return structuredClone(user);
  }

  //--------------------------- Authentication ----------------------------//

  register(name: string, identifier: string, password: string): UserType {
    this.#syncUsers();

    if (this.users.some((user) => user.identifier === identifier)) {
      throw new Error('Identifier already registered');
    }

    const user: UserType = {
      id: Date.now(),
      name: name.trim(),
      identifier: identifier.trim(),
      password,
      wishlist: [],
      cart: []
    };

    this.users.push(user);
    this.#saveUsers(user.id);

    return structuredClone(user);
  }

  login(identifier: string, password: string): UserType {
    this.#syncUsers();

    const user = this.users.find(
      (user) =>
        user.identifier === identifier.trim() && user.password === password
    );

    if (!user)
      throw new Error('Invalid credentials. Check your details or register.');

    return structuredClone(user);
  }

  deleteAccount(userId: number): void {
    this.#syncUsers();
    this.#getUserById(userId);

    this.users = this.users.filter((user) => user.id !== userId);
    this.#saveUsers();
  }

  updateUserData(userId: number, updatedData: Partial<UserType>): UserType {
    this.#syncUsers();

    const user = this.users.find((user) => user.id === userId);
    if (!user) throw new Error('User not found');

    Object.assign(user, updatedData);
    this.#saveUsers(userId);

    return structuredClone(user);
  }

  //---------------------------- Interactions -----------------------------//

  #modifyList(
    userId: number,
    ids: number[],
    list: 'wishlist' | 'cart',
    add: boolean
  ): boolean {
    this.#syncUsers();

    const user = this.users.find((user) => user.id === userId);
    if (!user) throw new Error('User not found');

    if (add) {
      user[list] = Array.from(new Set([...user[list], ...ids]));
    } else {
      user[list] = user[list].filter((item) => !ids.includes(item));
    }

    this.#saveUsers(userId);
    return true;
  }

  addToWishlist(userId: number, ids: number[]) {
    return this.#modifyList(userId, ids, 'wishlist', true);
  }

  removeFromWishlist(userId: number, ids: number[]) {
    return this.#modifyList(userId, ids, 'wishlist', false);
  }

  clearWishlist(userId: number) {
    this.#syncUsers();
    const user = this.users.find((user) => user.id === userId);
    if (!user) throw new Error('User not found');

    user.wishlist = [];
    this.#saveUsers(userId);
    return true;
  }

  addToCart(userId: number, ids: number[]) {
    return this.#modifyList(userId, ids, 'cart', true);
  }

  removeFromCart(userId: number, ids: number[]) {
    return this.#modifyList(userId, ids, 'cart', false);
  }

  clearCart(userId: number) {
    this.#syncUsers();
    const user = this.users.find((user) => user.id === userId);
    if (!user) throw new Error('User not found');

    user.cart = [];
    this.#saveUsers(userId);
    return true;
  }
}

const user = new User();
export default user;
