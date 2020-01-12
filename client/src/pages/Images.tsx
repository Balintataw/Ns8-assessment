import React from "react";
import { useParams, useHistory } from "react-router-dom";

import { IUser, IPhoto, IAlbum } from "src/types";
import api from "src/services/api-service";

import { BackButton } from "src/components/BackButton";
import { ImageModal } from "src/components/ImageModal";
import { Spinner } from "src/components/Spinner";

import "./Images.css";

export const Images = () => {
  const history = useHistory();
  const { id } = useParams();
  const [user, setUser] = React.useState<IUser | null>(null);
  const [photos, setPhotos] = React.useState<IPhoto[]>([]);
  const [albums, setAlbums] = React.useState<IAlbum[]>([]);
  const [currentAlbumName, setCurrentAlbumName] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [photosVisible, setPhotosVisible] = React.useState<boolean>(false);
  const [isImageModalVisible, setIsImageModalVisible] = React.useState<boolean>(
    false
  );
  const [currentImage, setCurrentImage] = React.useState<IPhoto | null>(null);

  React.useEffect(() => {
    const load = async () => {
      if (!id) {
        setLoading(false);
        // throw some kind of error
        return;
      }
      const user = await api.getUserById(id);
      setUser(user);

      const albums = await api.getAlbumsByUserId(id);
      setAlbums(albums);

      setLoading(false);
    };
    load();
    // id is user id
  }, [id]);

  const fetchAlbumPhotos = async (album: IAlbum) => {
    const photos = await api.getPhotosByAlbumId(album.id);
    setPhotos(photos);
    setCurrentAlbumName(album.title);
    setPhotosVisible(true);
  };

  return (
    <div style={{ padding: 8 }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: "0 8px"
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
      {loading ? (
        <div style={{ width: "100%", margin: "3rem auto" }}>
          <Spinner />
        </div>
      ) : (
        <div className="pr-2">
          {/* Subheader section */}
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
                  setCurrentAlbumName("");
                  setPhotosVisible(false);
                }}
              />
            )}
          </div>

          <div
            className="row text-center"
            style={{ padding: 16, justifyContent: "center" }}
          >
            {/* Switch out folders for images TODO make a nested router */}
            {albums.length &&
              !photosVisible &&
              albums.map(album => (
                <div
                  style={{ cursor: "pointer", height: "6rem" }}
                  className="col-xs-12 img-thumbnail m-3 folder"
                  onClick={() => fetchAlbumPhotos(album)}
                  key={album.id + Math.random()}
                >
                  <p>{album.title}</p>
                </div>
              ))}
            {photos.length && photosVisible && (
              <>
                <div style={{ width: "100%" }}>{currentAlbumName}</div>
                {photos.map(photo => (
                  <div
                    style={{ cursor: "pointer" }}
                    className="col-xs-12 m-3"
                    key={photo.id + Math.random()}
                  >
                    <img
                      className="img-fluid img-thumbnail"
                      src={photo.thumbnailUrl}
                      alt={photo.title}
                      onClick={() => {
                        setCurrentImage(photo);
                        setIsImageModalVisible(true);
                      }}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
      <ImageModal
        isVisible={isImageModalVisible}
        image={currentImage as IPhoto}
        onClose={() => {
          setIsImageModalVisible(false);
          setCurrentImage(null);
        }}
      ></ImageModal>
    </div>
  );
};
