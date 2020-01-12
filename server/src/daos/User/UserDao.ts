import { IUser, IPost } from "@entities";
import axios from "axios";

// Data Access Object
export interface IUserDao {
  getAll: () => Promise<IUser[]>;
  add: (user: IUser) => Promise<void>;
  update: (user: IUser) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export class UserDao implements IUserDao {
  /**
   *
   */
  public async getAll(): Promise<IUser[]> {
    const { data } = await axios.get(`${process.env.BASE_API_URL}/users`);
    return data as IUser[];
  }

  /**
   *
   * @param userId
   */
  public async getUserById(userId: number | string): Promise<IUser> {
    const { data } = await axios.get(
      `${process.env.BASE_API_URL}/users/${userId}`
    );
    return data as IUser;
  }

  /**
   *
   * @param userId
   */
  // NOTE the nested api calls appear to be broken
  // eg url/users/1/posts is returning all posts regardless of user id
  public async getUserPosts(userId: number | string): Promise<IPost[]> {
    const { data } = await axios.get(
      `${process.env.BASE_API_URL}/posts?userId=${userId}`
    );
    return data as IPost[];
  }

  /**
   *
   * @param user
   * NOTE Posts are faked, they will succeed or fail but are not persisted to api owners server
   */
  public async add(user: IUser): Promise<void> {
    // TODO
    const results = await axios.post(`${process.env.BASE_API_URL}/users`, user);
    console.log("POST RESPONSE", results);
    return results as any;
  }

  /**
   *
   * @param user
   */
  public async update(user: IUser): Promise<void> {
    // TODO
    return {} as any;
  }

  /**
   *
   * @param id
   */
  public async delete(id: number): Promise<void> {
    // TODO
    return {} as any;
  }
}
