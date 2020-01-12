import React from "react";
import { useParams, useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import overlayFactory from "react-bootstrap-table2-overlay";

import { IUser, IPost } from "src/types";
import api from "src/services/api-service";

import { BackButton } from "src/components/BackButton";

export const Posts = () => {
  const history = useHistory();
  const { id } = useParams();
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [user, setUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const load = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      const user = await api.getUserById(id);
      setUser(user);

      const posts = await api.getPostsByUserId(id);
      setPosts(posts);

      setLoading(false);
    };
    load();
  }, [id]);

  const cellEdit = cellEditFactory({
    mode: "click",
    nonEditableRows: () => ["id", "title"],
    blurToSave: true,
    beforeSaveCell: (oldValue: string, newValue: string) => {
      alert(`Pretending to save '${newValue}'`);
    }
  });

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
      dataField: "title",
      text: "Title",
      style: {
        verticalAlign: "middle"
      }
    },
    {
      dataField: "body",
      text: "Body",
      style: {
        verticalAlign: "middle"
      },
      editor: {
        type: Type.TEXTAREA
      }
    }
  ];

  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        {!loading && (
          <div style={{ width: "70%" }}>
            <h3>Posts</h3>
            <span style={{ paddingRight: "1rem" }}>Name: {user?.name}</span>
            <span style={{ paddingRight: "1rem" }}>
              Nickname: {user?.username}
            </span>
            <span>Email: {user?.email}</span>
          </div>
        )}
        <BackButton text="Home" onClick={() => history.goBack()} />
      </div>
      <BootstrapTable
        keyField="id"
        bootstrap4={true}
        data={posts}
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
