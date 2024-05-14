import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { jest } from "@jest/globals";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../../controllers/users";

dotenv.config();

describe("User Controller Tests", () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
    };
    jest.spyOn(bcrypt, "hash").mockImplementation(
      // eslint-disable-next-line no-unused-vars
      (password, _saltRounds = process.env.SALT_ROUNDS) => `hashed_${password}`
    );
  });

  test("createUser should add a new user and return it", async () => {
    mockRequest.body = {
      name: "Test User",
      username: "testuser",
      password: "testpassword",
    };
    await createUser(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalled();
    const newUser = mockResponse.json.mock.calls[0][0];
    expect(newUser.name).toBe("Test User");
    expect(newUser.username).toBe("testuser");
    expect(newUser.password).toBe("hashed_testpassword");
  });

  test("getUsers should return all users", () => {
    getUsers(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith([
      { id: 1, name: "Paul Desjardins", username: "pauldesjardins" },
      { id: 2, name: "John Desjardins", username: "johndesjardins" },
      {
        id: 3,
        name: "Test User",
        password: "hashed_testpassword",
        username: "testuser",
      },
    ]);
  });

  test("getUser should return the user with the specified id", () => {
    mockRequest.params = { id: "1" };
    getUser(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({
      id: 1,
      name: "Paul Desjardins",
      username: "pauldesjardins",
    });
  });

  test("getUser should return 204 with empty body with unexistant id", () => {
    mockRequest.params = { id: "99999" };
    getUser(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
  });

  test("updateUser should update the user with the specified id and return the updated user", async () => {
    mockRequest.params = { id: "1" };
    mockRequest.body = {
      name: "Updated User",
      username: "updateduser",
      password: "passwordtest",
    };
    await updateUser(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalled();
    const updatedUser = mockResponse.json.mock.calls[0][0];
    expect(updatedUser.id).toBe(1);
    expect(updatedUser.name).toBe("Updated User");
    expect(updatedUser.username).toBe("updateduser");
    expect(updatedUser.password).toBe("hashed_passwordtest");
  });

  test("updateUser should update the user with the specified id and without a password and return the updated user", async () => {
    mockRequest.params = { id: "1" };
    mockRequest.body = {
      name: "Updated User",
      username: "updateduser",
    };
    await updateUser(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalled();
    const updatedUser = mockResponse.json.mock.calls[0][0];
    expect(updatedUser.id).toBe(1);
    expect(updatedUser.name).toBe("Updated User");
    expect(updatedUser.username).toBe("updateduser");
    expect(updatedUser.password).toBe("hashed_passwordtest");
  });

  test("updateUser should return 204 with empty body with unexistant id", () => {
    mockRequest.params = { id: "99999" };
    updateUser(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
  });

  test("deleteUser should delete the user with the specified id", () => {
    mockRequest.params = { id: "1" };
    deleteUser(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.end).toHaveBeenCalled();
  });
});
