import React from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

import { IUser, IPhoto, IAlbum } from "src/types";

import { BackButton } from "src/components/BackButton";

export const Images = () => {
  const history = useHistory();
  const { id } = useParams();
  const [user, setUser] = React.useState<IUser | null>(null);
  const [photos, setPhotos] = React.useState<IPhoto[]>([]);
  const [albums, setAlbums] = React.useState<IAlbum[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [photosVisible, setPhotosVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const load = async () => {
      if (!id) {
        setLoading(false);
        // throw some kind of error
        return;
      }
      // TODO move all api calls to an api service file
      const { data } = await axios.get(
        `${process.env.REACT_APP_REST_API_BASE_URL}/users/${id}`
      );
      setUser(data);

      const allUserAlbums = await axios.get(
        `${process.env.REACT_APP_REST_API_BASE_URL}/users/albums/${id}`
      );
      setAlbums(allUserAlbums.data);

      setLoading(false);
    };
    load();
    // id is user id
  }, [id]);

  const fetchAlbumPhotos = async (albumId: number) => {
    const allAlbumPhotos = await axios.get(
      `${process.env.REACT_APP_REST_API_BASE_URL}/users/photos/${albumId}`
    );
    setPhotos(allAlbumPhotos.data);
    setPhotosVisible(true);
  };

  return (
    <div style={{ padding: 8 }}>
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
            <h3>Images</h3>
            <span style={{ paddingRight: "1rem" }}>Name: {user?.name}</span>
            <span style={{ paddingRight: "1rem" }}>
              Nickname: {user?.username}
            </span>
            <span>Email: {user?.email}</span>
          </div>
        )}
        <BackButton text="Home" onClick={() => history.goBack()} />
      </div>

      {/* Images section */}
      <div className="">
        <hr className="mt-2 mb-2" />
        <div
          style={{ display: "flex", position: "relative", height: "3.5rem" }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              margin: "auto",
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: 500
            }}
          >
            {photosVisible ? "Photos" : "Albums"}
          </span>
          {photosVisible && (
            <BackButton
              text="Back to Albums"
              onClick={() => {
                setPhotosVisible(false);
              }}
            />
          )}
        </div>

        <div
          className="row text-center"
          style={{ padding: 16, justifyContent: "center" }}
        >
          {albums.length && !photosVisible
            ? albums.map(album => (
                <div
                  style={{ cursor: "pointer", height: "6rem" }}
                  className="col-xs-12 col-md-3 img-thumbnail m-3"
                  onClick={() => fetchAlbumPhotos(album.id)}
                  key={album.id + Math.random()}
                >
                  <span className="d-block mb-4">{album.title}</span>
                </div>
              ))
            : photos.map(photo => (
                <div
                  className="col-xs-12 col-sm-6 col-md-4 col-lg-2 mb-3 mt-3"
                  key={photo.id + Math.random()}
                >
                  <img
                    className="img-fluid img-thumbnail"
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};
