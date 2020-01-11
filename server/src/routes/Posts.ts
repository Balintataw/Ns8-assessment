import { PostDao } from "@daos";
import { logger } from "@shared";
import { Request, Response, Router } from "express";
import { BAD_REQUEST, CREATED, OK } from "http-status-codes";
import { paramMissingError } from "@shared";
import { ParamsDictionary } from "express-serve-static-core";

// Init shared
const router = Router();
const postDao = new PostDao();

/******************************************************************************
 *                      Get All Posts - "GET /posts/all"
 ******************************************************************************/

router.get("/all", async (req: Request, res: Response) => {
  try {
    const posts = await postDao.getAll();
    return res.status(OK).json(posts);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                       Add One - "POST /posts/add"
 ******************************************************************************/

router.post("/add", async (req: Request, res: Response) => {
  try {
    const { post } = req.body;
    if (!post) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError
      });
    }
    await postDao.add(post);
    return res.status(CREATED).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                       Update - "PUT /posts/update"
 ******************************************************************************/

router.put("/update", async (req: Request, res: Response) => {
  try {
    const { post } = req.body;
    if (!post) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError
      });
    }
    post.id = Number(post.id);
    await postDao.update(post);
    return res.status(OK).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                    Delete - "DELETE /posts/delete/:id"
 ******************************************************************************/

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params as ParamsDictionary;
    await postDao.delete(Number(id));
    return res.status(OK).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
