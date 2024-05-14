import express from "express";
import Boom from "@hapi/boom";
import timeout from "connect-timeout";
import errorHandler from "./middlewares/errorHandler";
import checkJwt from "./middlewares/checkJwt";
import routes from "./routes/index";

const app = express();

// parse json request body
app.use(express.json());

// enable request timeout
app.use(timeout("5s"));

// auth0 jwt check
app.use(checkJwt);

// api routes
app.use("/", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(Boom.notFound());
});

// handle error
app.use(errorHandler);

export default app;
