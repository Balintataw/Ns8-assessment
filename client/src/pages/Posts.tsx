import React from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import overlayFactory from "react-bootstrap-table2-overlay";

import { IUser, IPost } from "../types";

export const Posts = () => {
  const history = useHistory();
  const { id } = useParams();
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const load = async () => {
      const allPosts = await axios.get(
        `${process.env.REACT_APP_REST_API_BASE_URL}/users/posts/${id}`
      );
      setPosts(allPosts.data);
      console.log("POSTS FOR USER", allPosts);

      setLoading(false);
    };
    id && load();
  }, []);

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
      }
    }
  ];

  const BackButton = () => {
    return (
      <button
        style={{ textAlign: "center", cursor: "pointer", lineHeight: "normal" }}
        type="button"
        className="btn btn-primary"
        onClick={() => history.goBack()}
      >
        <i className="fas fa-chevron-left pr-2"></i>
        Home
      </button>
    );
  };

  return (
    <div style={{ padding: 8 }}>
      <div>
        <p>Name: Biff</p>
        <p>Nickname: Future Biff</p>
        <p>Email: Biffmail</p>
        <BackButton />
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
      />
    </div>
  );
};
