import { IPost } from "@entities";
import axios from "axios";

// Data Access Object
export interface IPostDao {
  getAll: () => Promise<IPost[]>;
  add: (post: IPost) => Promise<void>;
  update: (post: IPost) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export class PostDao implements IPostDao {
  /**
   *
   */
  public async getAll(): Promise<IPost[]> {
    // TODO types this response
    const { data } = await axios.get(`${process.env.BASE_API_URL}/posts`);
    console.log("DATA", data);
    return data as IPost[];
  }

  /**
   *
   * @param post
   * NOTE Posts are faked, they will succeed or fail but are not persisted to api owners server
   */
  public async add(post: IPost): Promise<void> {
    // TODO
    const results = await axios.post(`${process.env.BASE_API_URL}/posts`, post);
    console.log("POST RESPONSE", results);
    return results as any;
  }

  /**
   *
   * @param post
   */
  public async update(post: IPost): Promise<void> {
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
