import { Request, Response } from "express";
import Book from "../database/models/Books";
import { IBook } from "../types";

export const getBooks = async (_: Request, res: Response) => {
  try {
    const Books = await Book.find();
    if (Books) {
      res.status(200).json({
        Books
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error en la petición."
    });
  }
};

export const getBook = async (req: Request, res: Response) => {
  const bookId = req.params.bookId;

  if (!bookId) {
    res.status(400).json({
      message: "Falta la ID por la cual buscar el libro."
    });
  } else {
    try {
      const response = await Book.findById(bookId);
      if (response) {
        res.status(200).json({
          response
        });
      } else {
        res.status(500).json({
          message: "El libro que intenta buscar no existe."
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

export const createBook = async (req: Request, res: Response) => {
  const body: IBook = req.body;
  const { author, description, title, userUploaderId } = body;
  if (!author || !description || !title || !userUploaderId) {
    res.status(500).json({
      message:
        "Faltan datos. Los datos necesarios son: author, description, userUploaderId, title. Todos son string."
    });
  } else {
    try {
      const searchRepeatedBook = await Book.find({
        title
      });

      if (!(searchRepeatedBook.length > 0)) {
        try {
          const newBook = new Book({
            title,
            description,
            author
          });

          await newBook.save();

          res.status(200).json({
            message: "El libro fue creado satisfactoriamente",
            bookId: newBook._id
          });
        } catch (error) {
          res.status(500).json({
            message: "Hubo un error registrando el libro.",
            error
          });
        }
      } else {
        res.status(400).json({
          message: "El libro que intenta registrar ya está registrado."
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Ocurrió un error buscando un libro duplicado.",
        error
      });
    }
  }
};

export const updateBook = async (res: Response, req: Request) => {
  const body = req.body;
  const bookId = req.params.bookId;
  if (!body || !bookId) {
    res.status(400).json({
      message: "La petición carece de cuerpo o de id en el endpoint."
    });
  } else {
    try {
      const response = await Book.findByIdAndUpdate(bookId, body);
      if (!response) {
        res.status(500).json({
          message: "Ocurrió un error actualizando el libro."
        });
      } else {
        res.status(200).json({
          message: "El libro fue actualizado exitosamente"
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

export const deleteBook = async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  if (!bookId) {
    res.status(400).json({
      message: "La petición carece de id"
    });
  } else {
    try {
      const response = await Book.findByIdAndRemove(bookId);
      if (!response) {
        res.status(500).json({
          message: "Hubo un error al intentar remover el libro."
        });
      } else {
        res.status(200).json({
          message: "El libro fue removido exitosamente."
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
