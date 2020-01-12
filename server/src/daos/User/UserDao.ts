import { IUser, IPost, IAlbums, IPhotos } from "@entities";
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
   * @param userId
   */
  // NOTE the nested api calls appear to be broken
  // eg url/users/1/posts is returning all posts regardless of user id
  public async getUserAlbums(userId: number | string): Promise<IAlbums[]> {
    const { data } = await axios.get(
      `${process.env.BASE_API_URL}/albums?userId=${userId}`
    );
    return data as IAlbums[];
  }

  /**
   *
   * @param albumId
   */
  // NOTE the nested api calls appear to be broken
  // eg url/users/1/posts is returning all posts regardless of user id
  public async getUserPhotosByAlbumId(
    albumId: number | string
  ): Promise<IPhotos[]> {
    const { data } = await axios.get(
      `${process.env.BASE_API_URL}/photos?albumId=${albumId}`
    );
    return data as IPhotos[];
  }

  /**
   *
   * @param user
   * NOTE Posts are faked, they will succeed or fail but are not persisted to api owners server
   */
  public async add(user: IUser): Promise<void> {
    // TODO
    const results = await axios.post(`${process.env.BASE_API_URL}/users`, user);
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
