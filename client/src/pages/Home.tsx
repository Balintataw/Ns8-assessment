import React from "react";
import axios from "axios";
import {
  BootstrapTable,
  TableHeaderColumn,
  InsertButton
} from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

import { IUser, IPost } from "../types";

export const Home = () => {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [posts, setPosts] = React.useState<IPost[]>([]);

  React.useEffect(() => {
    const load = async () => {
      const allUsers = await axios.get(
        `${process.env.REACT_APP_REST_API_BASE_URL}/users/all`
      );
      setUsers(allUsers.data);
      console.log("USERS", allUsers);

      const allPosts = await axios.get(
        `${process.env.REACT_APP_REST_API_BASE_URL}/users/posts/${allUsers.data[0].id}`
      );
      setPosts(allPosts.data);
      console.log("POSTS FOR USER", allPosts);
    };
    load();
  }, []);

  const handleInsertButtonClick = (onClick: any) => {};

  const createCustomInsertButton = (onClick: any) => {
    return (
      <InsertButton
        btnText="View Posts"
        btnContextual="btn-warning"
        className="my-custom-class"
        btnGlyphicon="glyphicon-edit"
        onClick={() => handleInsertButtonClick(onClick)}
      />
    );
  };
  //...
  const options = {
    noDataText: "No data available"
    // insertBtn: createCustomInsertButton
  };

  return (
    <div>
      <h1>Home</h1>
      {users.length ? (
        <BootstrapTable data={users} striped hover options={options} insertRow>
          <TableHeaderColumn isKey dataField="id">
            User ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
          <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
          <TableHeaderColumn dataFormat={createCustomInsertButton}>
            Posts
          </TableHeaderColumn>
        </BootstrapTable>
      ) : (
        <p>no users</p>
      )}
    </div>
  );
};
