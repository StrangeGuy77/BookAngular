import { Request, Response } from "express";
import User from "../database/models/User";
import { IUser } from "../types";
import * as bcrypt from "bcryptjs";

export const getUsers = async (_: Request, res: Response) => {
  const Users = await User.find();
  if (Users) {
    res.status(200).json({
      Users
    });
  } else {
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
  console.log(user_email, password);
  if (!user_email || !password) {
    res.status(500).json({
      message:
        "Faltan datos. El envío del usuario & contraseña son obligatorios."
    });
  } else {
    try {
      const searchRepeatedEmail = await User.find({
        email: body.user_email
      });

      if (!(searchRepeatedEmail.length > 0)) {
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
      } else {
        res.status(400).json({
          message: "El usuario que intenta registrar ya está registrado."
        });
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
  const body = req.body;
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
          message: "El usuario fue actualizado exitosamente"
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
