import { Request, Response } from "express";
import Book from "../database/models/Books";
import { IBook } from "../types";
import User from "../database/models/User";

export const getBooks = async (req: Request, res: Response) => {

  const returningBooks: IBook[] = [];
  if (req.query.categoryname)
  {
    const category = req.query.categoryname;
    const BooksFound: any = (await Book.find({ categories: { "$in": [`${category}`] } }));
    if (BooksFound)
    {
      if (req.query.only)
      {
        res.json({
          BooksFound
        });
      } else
      {
        returningBooks.push(BooksFound);
      }
    } else
    {
      res.json({
        message: `There are no books with ${category} category within database.`
      });
    }
  }
  if (req.query.userId)
  {
    try
    {
      const { userId } = req.query;
      const bookCollection = await User.findById(userId, 'book_collection');
      if (bookCollection)
      {
        res.json({
          bookCollection
        });
      } else
      {
        res.json({
          message: "The user you're looking for doesnt exist or doesnt have any book within his collection."
        });
      }
    } catch (error)
    {
      res.json({
        message: "There was an error while searching for books within user collection.",
        error
      });
    }
  }

  if (!(returningBooks.length > 0) && !req.query.only)
  {
    try
    {
      const Books: any = await Book.find();
      if (Books)
      {
        returningBooks.push(Books);
        res.json({
          returningBooks
        });
      }
    } catch (error)
    {
      res.json({
        message: "Ocurrió un error en la petición."
      });
    }
  }
};

export const getBook = async (req: Request, res: Response) => {
  const bookId = req.params.bookId;

  if (!bookId)
  {
    res.json({
      message: "Falta la ID por la cual buscar el libro."
    });
  } else
  {
    try
    {
      const response = await Book.findById(bookId);
      if (response)
      {
        res.json({
          response
        });
      } else
      {
        res.json({
          message: "El libro que intenta buscar no existe."
        });
      }
    } catch (error)
    {
      res.json({
        message: "Ocurrió un error en la petición.",
        error
      });
    }
  }
};

export const createBook = async (req: Request, res: Response) => {
  const body: IBook = req.body;
  const { author, description, title, userUploaderId, urlImg } = body;
  if (!author || !description || !title || !userUploaderId || !urlImg)
  {
    res.json({
      message:
        "Faltan datos. Los datos necesarios son: author, description, userUploaderId, title. Todos son string."
    });
  } else
  {
    try
    {
      const searchRepeatedBook = await Book.find({
        title
      });

      if (!(searchRepeatedBook.length > 0))
      {
        try
        {
          const newBook = new Book({
            ...body,
            categories: (body as any).categories.split(',')
          });
          await newBook.save();

          res.json({
            message: "El libro fue creado satisfactoriamente",
            bookId: newBook._id
          });
        } catch (error)
        {
          res.json({
            message: "Hubo un error registrando el libro.",
            error
          });
        }
      } else
      {
        res.json({
          message: "El libro que intenta registrar ya está registrado."
        });
      }
    } catch (error)
    {
      res.json({
        message: "Ocurrió un error buscando un libro duplicado.",
        error
      });
    }
  }
};

export const updateBook = async (res: Response, req: Request) => {
  const body = req.body;
  const bookId = req.params.bookId;
  if (!body || !bookId)
  {
    res.json({
      message: "La petición carece de cuerpo o de id en el endpoint."
    });
  } else
  {
    try
    {
      const response = await Book.findByIdAndUpdate(bookId, body);
      if (!response)
      {
        res.json({
          message: "Ocurrió un error actualizando el libro."
        });
      } else
      {
        res.json({
          message: "El libro fue actualizado exitosamente"
        });
      }
    } catch (error)
    {
      res.json({
        message: "Ocurrió un error en el servidor.",
        error
      });
    }
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  if (!bookId)
  {
    res.json({
      message: "La petición carece de id"
    });
  } else
  {
    try
    {
      const response = await Book.findByIdAndRemove(bookId);
      if (!response)
      {
        res.json({
          message: "Hubo un error al intentar remover el libro."
        });
      } else
      {
        res.json({
          message: "El libro fue removido exitosamente."
        });
      }
    } catch (error)
    {
      res.json({
        message: "Hubo un error interno del servidor",
        error
      });
    }
  }
};
