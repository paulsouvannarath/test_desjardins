/* eslint-disable no-console */
import * as dotenv from "dotenv";
import app from "./server";

dotenv.config();

const server = app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening to port ${process.env.SERVER_PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});
