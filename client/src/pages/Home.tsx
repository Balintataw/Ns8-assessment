import React from "react";
import axios from "axios";

import { IUser } from "../types/User";

export const Home = () => {
  const [users, setUsers] = React.useState<IUser[]>([]);

  React.useEffect(() => {
    const load = async () => {
      const allUsers = await axios.get(
        `${process.env.REACT_APP_REST_API_BASE_URL}/users/all`
      );
      setUsers(allUsers.data);
      console.log("RESPONSE", allUsers);
    };
    load();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {users.length ? (
        <ul>
          {users.map((user: IUser) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>no users</p>
      )}
    </div>
  );
};
