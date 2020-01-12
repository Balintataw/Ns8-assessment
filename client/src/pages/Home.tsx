import React, { MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import overlayFactory from "react-bootstrap-table2-overlay";

import { IUser } from "src/types";
import api from "src/services/api-service";

export const Home = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [users, setUsers] = React.useState<IUser[]>([]);

  React.useEffect(() => {
    const load = async () => {
      // load all users, limited to 10 by api
      const allUsers = await api.getAllUsers();
      setUsers(allUsers);

      setLoading(false);
    };
    load();
  }, []);

  const createViewPostsButton = () => (
    <button
      style={{
        textAlign: "center",
        cursor: "pointer",
        lineHeight: "normal"
      }}
      type="button"
      className="btn btn-warning"
    >
      {/* Because when do you ever get to use the fighter jet icon? */}
      <i className="fas fa-fighter-jet pr-2"></i>
      View Posts
    </button>
  );

  // TODO find out what these types are or scrap them
  const createViewImagesButton = (
    cell: any,
    row: any,
    rowIndex: number,
    formatExtraData: any
  ) => (
    <button
      style={{
        textAlign: "center",
        cursor: "pointer",
        lineHeight: "normal"
      }}
      type="button"
      className="btn btn-warning"
    >
      {/* Because when do you ever get to use the cat icon? */}
      <i className="fas fa-cat pr-2"></i>
      View Images
    </button>
  );

  const cellEdit = cellEditFactory({
    mode: "click",
    nonEditableRows: () => ["id"],
    // blurToSave: true,
    beforeSaveCell: (oldValue: string, newValue: string) => {
      alert(`Pretending to save '${newValue}'`);
    }
  });

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
      dataField: "posts",
      text: "Posts",
      isDummyField: true,
      csvExport: false,
      align: "center",
      style: {
        verticalAlign: "middle"
      },
      headerAttrs: { width: 180 },
      headerAlign: "center",
      formatter: createViewPostsButton,
      events: {
        onClick: (
          e: MouseEvent, // click event
          column: any, // this is the data defined in columns array, would have to make interface with bunch of optional fields
          columnIndex: number,
          row: IUser, // this is the user data
          rowIndex: number
        ) => {
          history.push(`/posts/${row.id}`);
        }
      }
    },
    {
      dataField: "images",
      text: "Images",
      isDummyField: true,
      csvExport: false,
      align: "center",
      style: {
        verticalAlign: "middle"
      },
      headerAttrs: { width: 180 },
      headerAlign: "center",
      formatter: createViewImagesButton,
      events: {
        onClick: (
          e: MouseEvent, // click event
          column: any, // this is the data defined in columns array, would have to make interface with bunch of optional fields
          columnIndex: number,
          row: IUser, // this is the user data
          rowIndex: number
        ) => {
          history.push(`/images/${row.id}`);
        }
      }
    }
  ];

  return (
    <div style={{ padding: 16 }}>
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
        cellEdit={cellEdit}
      />
    </div>
  );
};
