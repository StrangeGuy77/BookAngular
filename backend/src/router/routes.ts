import { Application, Router, Request, Response } from "express";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} from "../controllers/user";
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} from "../controllers/books";

const router = Router();

export default (app: Application) => {
  router
    .route("/")
    .all((_: Request, res: Response) =>
      res.send(
        'Esta no es la página principal. El endpoint de las rutas son: "...com/user", "...com/books o, de solicitarlo por id para cambios u otra cosa "...com/user/:id" y lo mismo con books.'
      )
    );

  router
    .route("/user")
    .get(getUsers)
    .post(createUser);

  router
    .route("/user/:userId")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

  router
    .route("/books")
    .get(getBooks)
    .post(createBook);

  router
    .route("/user/:bookId")
    .get(getBook)
    .put(updateBook)
    .delete(deleteBook);

  app.use(router);

  return app;
};
