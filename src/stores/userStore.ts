import { IUser } from '../interfaces/user';
export const createUserStore = () => {
  return {
    user: null,
    setUser(user: IUser) {
      this.user = user
    }
  }
}
