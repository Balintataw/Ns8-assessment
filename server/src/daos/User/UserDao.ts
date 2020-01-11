import { IUser } from "@entities";
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
    // TODO types this response
    const { data } = await axios.get(`${process.env.BASE_API_URL}/users`);
    console.log("DATA", data);
    return data as IUser[];
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
