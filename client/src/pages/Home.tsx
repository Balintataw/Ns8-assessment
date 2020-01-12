import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import overlayFactory from "react-bootstrap-table2-overlay";

// import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import { IUser, IPost } from "../types";

export const Home = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [users, setUsers] = React.useState<IUser[]>([]);

  React.useEffect(() => {
    const load = async () => {
      const allUsers = await axios.get(
        `${process.env.REACT_APP_REST_API_BASE_URL}/users/all`
      );
      setUsers(allUsers.data);
      console.log("USERS", allUsers);

      setLoading(false);
    };
    load();
  }, []);

  // TODO find out what these types are or scrap them
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
      {/* Because when do you ever et to use the fighter jet icon? */}
      <i className="fas fa-fighter-jet pr-2"></i>
      View Posts
    </button>
  );

  // define all your columns here
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
      headerAttrs: { width: 180 },
      formatter: createViewPostsButton,
      events: {
        // TODO find out what these types are or scrap them
        onClick: (
          e: any, // click event
          column: any, // this is the data defined in columns array
          columnIndex: number,
          row: any, // this is the user data
          rowIndex: number
        ) => {
          console.log("CLICK", e, column, columnIndex, row, rowIndex);
          history.push(`/posts/${row.id}`);
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
