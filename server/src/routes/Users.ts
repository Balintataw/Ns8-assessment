import { UserDao } from "@daos";
import { logger } from "@shared";
import { Request, Response, Router } from "express";
import { BAD_REQUEST, CREATED, OK } from "http-status-codes";
import { paramMissingError } from "@shared";
import { ParamsDictionary } from "express-serve-static-core";

// Init shared
const router = Router();
const userDao = new UserDao();

/******************************************************************************
 *                      Get All Users - "GET /users/all"
 ******************************************************************************/

router.get("/all", async (req: Request, res: Response) => {
  try {
    const users = await userDao.getAll();
    return res.status(OK).json(users);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                      Get User by ID - "GET /users/:id"
 ******************************************************************************/

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await userDao.getUserById(id);
    return res.status(OK).json(user);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                      Get All Users with Posts - "GET /users/posts/:id"
 ******************************************************************************/

router.get("/posts/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const userPosts = await userDao.getUserPosts(userId);
    return res.status(OK).json(userPosts);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                      Get Users Albums - "GET /users/albums/:id"
 ******************************************************************************/

router.get("/albums/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const userAlbums = await userDao.getUserAlbums(userId);
    return res.status(OK).json(userAlbums);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                      Get All Users photos by albumId - "GET /users/photos"
 ******************************************************************************/

router.get("/photos/:id", async (req: Request, res: Response) => {
  const albumId = req.params.id;
  try {
    const userPhotos = await userDao.getUserPhotosByAlbumId(albumId);
    return res.status(OK).json(userPhotos);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                       Add One - "POST /users/add"
 ******************************************************************************/

router.post("/add", async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    if (!user) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError
      });
    }
    await userDao.add(user);
    return res.status(CREATED).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                       Update - "PUT /users/update"
 ******************************************************************************/

router.put("/update", async (req: Request, res: Response) => {});

/******************************************************************************
 *                    Delete - "DELETE /users/delete/:id"
 ******************************************************************************/

router.delete("/delete/:id", async (req: Request, res: Response) => {});

export default router;
