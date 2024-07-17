const request = require("supertest");
const { sequelize, User } = require("../models");
const app = require("../app");

jest.mock("bcryptjs", () => ({
  hash: jest.fn((password, saltRounds) =>
    Promise.resolve(`hashed_${password}`)
  ),

  compare: jest.fn((password, hash) =>
    Promise.resolve(hash === `hashed_${password}`)
  ),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn((payload, secret) => "mocked_token"),
}));

afterAll(async () => {
  await sequelize.close();
});

beforeEach(async () => {
  await sequelize.sync({ force: true });
  await User.create({
    username: "existinguser",
    email: "existinguser@example.com",
    password: "hashed_password123",
  });
});

describe("POST /api/auth/register", () => {
  it("should register a new user and return a token", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "newuser",
      email: "newuser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token", "mocked_token");

    const user = await User.findOne({
      where: { email: "newuser@example.com" },
    });
    expect(user).not.toBeNull();
    expect(user.username).toEqual("newuser");
    expect(user.email).toEqual("newuser@example.com");
    expect(user.password).toEqual("hashed_password123");
  });

  it("should fail if user already exists", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser2",
      email: "existinguser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "Registration failed");
  });
});

describe("POST /api/auth/signin", () => {
  it("should return 404 if user is not found", async () => {
    const res = await request(app).post("/api/auth/signin").send({
      email: "nonexistent@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error", "User not found");
  });

  it("should return 401 if password is incorrect", async () => {
    const res = await request(app).post("/api/auth/signin").send({
      email: "existinguser@example.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error", "Invalid password");
  });

  it("should return 200 and a token if credentials are correct", async () => {
    const res = await request(app).post("/api/auth/signin").send({
      email: "existinguser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token", "mocked_token");
  });

  it("should return 200 and verify email if password is not provided", async () => {
    const res = await request(app).post("/api/auth/signin").send({
      email: "existinguser@example.com",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Email verified");
  });
});
