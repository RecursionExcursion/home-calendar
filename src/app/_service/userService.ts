import { User, createNewUser } from "../_types/models/user";
import { userRepo } from "../_repository/userRepo";

export const userService = {
  createNewUser: async (username: string, password: string) => {
    const newUser: User = createNewUser({ username, password });
    const result = await userRepo.save(newUser);
    return result;
  },

  getUserByUsername: async (username: string) => {
    const user = await userRepo.getByUsername(username);
    return user;
  },

  getUserById: async (id: string) => {
    const user = await userRepo.getById(id);
    return user;
  },

  updateUser: async (user: User) => {
    const result = await userRepo.update(user);
    return result;
  },

  deleteUser: async (id: string) => {
    const result = await userRepo.delete(id);
    return result;
  },
};
