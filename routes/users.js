import express from "express";
import checkScopes from "../middlewares/checkScopes";
import validateSchema from "../middlewares/validateSchema";
import { createUserSchema, updateUserSchema } from "../validationSchemas/users";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users";

const router = express.Router();

router
  .route("/")
  .post(checkScopes("crud:users"), validateSchema(createUserSchema), createUser)
  .get(checkScopes("crud:users"), getUsers);

router
  .route("/:id")
  .get(checkScopes("crud:users"), getUser)
  .put(checkScopes("crud:users"), validateSchema(updateUserSchema), updateUser)
  .delete(checkScopes("crud:users"), deleteUser);

export default router;
