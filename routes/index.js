import express from "express";
import usersRoute from "./users";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/users",
    route: usersRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
