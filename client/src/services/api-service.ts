import axios, { AxiosInstance } from "axios";
import { IUser, IAlbum, IPhoto, IPost } from "src/types";

interface ICustomAxiosInstance extends AxiosInstance {
  getAllUsers: () => Promise<IUser[]>;
  getUserById: (id: number | string) => Promise<IUser>;
  getUserAlbums: (id: number | string) => Promise<IAlbum[]>;
  getPhotosByAlbumId: (id: number | string) => Promise<IPhoto[]>;
  getPostsByUserId: (id: number | string) => Promise<IPost[]>;
}

const instance = axios.create({}) as ICustomAxiosInstance;

// instance.tokenPath = '/login'
// instance.registerPath = '/registration'
// instance.token = window.localStorage.getItem('token') || null

// instance.new = function(url = '/') {
//   this.defaults.baseURL = url

//   if (this.token) {
//     this.tokenInterceptor = this.interceptors.request.use(config => {
//       config.headers['Authorization'] = 'Bearer ' + this.token
//       return config
//     })
//   }
// }

instance.getAllUsers = async function(): Promise<IUser[]> {
  const allUsers = await axios.get<IUser[]>(
    `${process.env.REACT_APP_REST_API_BASE_URL}/users/all`
  );
  return allUsers.data;
};

instance.getUserById = async function(id): Promise<IUser> {
  const user = await axios.get<IUser>(
    `${process.env.REACT_APP_REST_API_BASE_URL}/users/${id}`
  );
  return user.data;
};

instance.getUserAlbums = async function(id): Promise<IAlbum[]> {
  const allUserAlbums = await axios.get<IAlbum[]>(
    `${process.env.REACT_APP_REST_API_BASE_URL}/users/albums/${id}`
  );
  return allUserAlbums.data;
};

instance.getPhotosByAlbumId = async function(id): Promise<IPhoto[]> {
  const allAlbumPhotos = await axios.get<IPhoto[]>(
    `${process.env.REACT_APP_REST_API_BASE_URL}/users/photos/${id}`
  );
  return allAlbumPhotos.data;
};

instance.getPostsByUserId = async function(id): Promise<IPost[]> {
  const allPosts = await axios.get<IPost[]>(
    `${process.env.REACT_APP_REST_API_BASE_URL}/users/posts/${id}`
  );
  return allPosts.data;
};

export default instance;
