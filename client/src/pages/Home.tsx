import React from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import overlayFactory from "react-bootstrap-table2-overlay";

// import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import { IUser, IPost } from "../types";
import { findByLabelText } from "@testing-library/react";

export const Home = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
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
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    };
    load();
  }, []);

  const createViewPostsButton = (
    cell: any,
    row: any,
    rowIndex: any,
    formatExtraData: any
  ) => (
    <button
      style={{ textAlign: "center", cursor: "pointer", lineHeight: "normal" }}
      type="button"
      className="btn btn-warning"
    >
      <i className="glyphicon glyphicon-edit"></i>
      View Posts
    </button>
  );

  const columns = [
    {
      dataField: "id",
      text: "ID",
      headerAttrs: { width: 50 },
      style: {
        verticalAlign: "middle"
      }
    },
    {
      dataField: "name",
      text: "User Name",
      style: {
        verticalAlign: "middle"
      }
    },
    {
      dataField: "username",
      text: "Nickname",
      style: {
        verticalAlign: "middle"
      }
    },
    {
      dataField: "email",
      text: "User Email",
      style: {
        verticalAlign: "middle"
      }
    },
    {
      dataField: "actions",
      text: "Actions",
      isDummyField: true,
      csvExport: false,
      align: "center",
      headerAttrs: { width: 140 },
      formatter: createViewPostsButton,
      events: {
        onClick: (
          e: any,
          column: any,
          columnIndex: any,
          row: any,
          rowIndex: any
        ) => {
          alert("CLICKED");
          // TODO route navigate to users posts table page
        }
      }
    }
  ];

  return (
    <div style={{ padding: 8 }}>
      <BootstrapTable
        keyField="id"
        bootstrap4={true}
        data={users}
        striped
        hover
        columns={columns}
        noDataIndication={() => "No Data Available"}
        loading={loading} //only loading is true, react-bootstrap-table will render overlay
        overlay={overlayFactory({
          spinner: true,
          background: "rgba(122,122,122,0.3)"
        })}
      />
    </div>
  );
};
