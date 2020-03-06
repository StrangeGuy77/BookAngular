import { Request, Response } from "express";
import User from "../database/models/User";
import Book from "../database/models/Books";
import { IUser, IBook } from "../types";
import * as bcrypt from "bcryptjs";

export const getUsers = async (_: Request, res: Response) => {
  try {
    const Users = await User.find();
    if (Users.length > 0) {
      res.status(200).json({
        Users
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error en la petición."
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  if (!userId) {
    res.status(400).json({
      message: "Falta la ID por la cual buscar al usuario."
    });
  } else {
    try {
      const response = await User.findById(userId);
      if (response) {
        res.status(200).json({
          response
        });
      } else {
        res.status(500).json({
          message: "El usuario que intenta buscar no existe."
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Ocurrió un error en la petición.",
        error
      });
    }
  }
};

export const createUser = async (req: Request, res: Response) => {
  const body: IUser = req.body;
  const { user_email, password } = body;
  if (!user_email || !password) {
    res.status(500).json({
      message:
        "Faltan datos. El envío del usuario & contraseña son obligatorios."
    });
  } else {
    try {
      const searchRepeatedEmail = await User.find({
        user_email
      });

      if (searchRepeatedEmail.length > 0) {
        res.status(400).json({
          message: "El usuario que intenta registrar ya está registrado."
        });
      } else {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = new User({
            user_email: user_email,
            password: hashedPassword,
            confirmed: false,
            user_role: "unconfirmed_user"
          });

          await newUser.save();

          res.status(200).json({
            message: "El usuario fue registrado exitosamente",
            userId: newUser._id
          });
        } catch (error) {
          res.status(500).json({
            message: "Hubo un error registrando al usuario.",
            error
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        message: "Ocurrió un error buscando un email duplicado.",
        error
      });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  if (!userId) {
    res.status(400).json({
      message: "La petición carece de id"
    });
  } else {
    try {
      const response = await User.findByIdAndRemove(userId);
      if (!response) {
        res.status(500).json({
          message: "El usuario que intenta eliminar no existe."
        });
      } else {
        res.status(200).json({
          message: "El usuario fue removido exitosamente."
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error interno del servidor",
        error
      });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const body = JSON.parse(JSON.stringify(req.body));
  const userId = req.params.userId;
  if (!body || !userId) {
    res.status(400).json({
      message: "La petición carece de cuerpo o de id en el endpoint."
    });
  } else {
    try {
      const response = await User.findByIdAndUpdate(userId, body);
      if (!response) {
        res.status(500).json({
          message: "El usuario que intenta actualizar no existe."
        });
      } else {
        res.status(200).json({
          message: "El usuario fue actualizado exitosamente",
          response
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Ocurrió un error en el servidor.",
        error
      });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { user_email, password }: IUser = JSON.parse(JSON.stringify(req.body));

  if (!user_email || !password) {
    res.status(400).json({
      message:
        "Faltan datos por enviar. El email y la contraseña son obligatorios."
    });
  } else {
    try {
      const userExist: IUser = (await User.findOne({ user_email })) as IUser;

      if (userExist) {
        const hashedPassword = userExist.password;
        if (bcrypt.compareSync(password, hashedPassword)) {
          userExist.password = "";
          res.status(400).json({
            message: "Inicio de sesión correcto.",
            userExist
          });
        } else {
          res.status(400).json({
            message: "Email o contraseña incorrectos."
          });
        }
      } else {
        res.status(400).json({
          message: "Email o contraseña incorrectos."
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Ocurrió un error durante la petición.",
        error
      });
    }
  }
};

export const saveABookIntoUser = async (req: Request, res: Response) => {
  if (req.query) {
    const { bookId } = req.query;
    const { userId } = req.params;
    if (!bookId || !userId) {
      res.status(400).json({
        message:
          "Faltan datos por enviar. El id del libro y del usuario son obligatorios. Revise la url y verifique: 'user/:userId?bookId=:bookId'"
      });
    } else {
      const bookExist: IBook = (await Book.findById(bookId)) as IBook;
      const userExist: IUser = (await User.findById(userId)) as IUser;
      if (bookExist && userExist) {
        const isBookWithinBookCollection = userExist.book_collection.find(
          (book: IBook) => book._id == bookId
        );
        if (!isBookWithinBookCollection) {
          userExist.book_collection?.push(bookExist);
          await userExist.save();
          res.status(200).json({
            message:
              "El libro fue agregado correctamente al arreglo de libros del usuario.",
            updatedCollection: userExist.book_collection
          });
        } else {
          res.status(400).json({
            message:
              "El libro que intenta agregar a la colección del usuario ya existe dentro de su colección."
          });
        }
      } else {
        res.status(400).json({
          message:
            "El libro o el usuario no existe. Por favor verifique el ID que ha enviado mediante las rutas /books/:bookId o /user/:userId"
        });
      }
    }
  } else {
    const Book: IBook = JSON.parse(JSON.stringify(req.body));
    const userId = req.params.userId;

    if (!Book.title || !Book.description || !Book.author || !userId) {
      res.status(400).json({
        message:
          "La id del usuario no pueden estar vacíos. Los campos obligatorios del libro son: author, description, title"
      });
    } else {
      try {
        const userExist: IUser = (await User.findById(userId)) as IUser;
        if (userExist) {
          try {
            userExist.book_collection?.push(Book);
            await userExist.save();
            res.status(200).json({
              message: "Libro guardado exitosamente.",
              updatedCollection: userExist.book_collection
            });
          } catch (error) {
            res.status(500).json({
              message: "Hubo un error guardando el libro dentro del usuario",
              error
            });
          }
        } else {
          res.status(400).json({
            message: "El usuario al que intenta asignar el libro no existe."
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "Hubo un error buscando al usuario."
        });
      }
    }
  }
};
