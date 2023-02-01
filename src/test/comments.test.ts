const request = require("supertest");
const baseURL = "http://localhost:8000/api";

let token = "";
let createdPostId;

describe("POST /post (creating post to test comments API)", () => {
  let validPost = {
    title: "This is a test post, a valid one",
    body: "This is a valid post body"
  };
  let invalidPost = {
    title: "Sample title"
  };

  beforeAll(async () => {
    let loginBody = {
      email: "agichamukesh@gmail.com",
      password: "sample@123"
    };
    const response = await request(baseURL).post("/auth/login").set("Content-type", "application/json").send(loginBody);
    token = response.body.access_token;
  });
  it("should create valid Post", async () => {
    const response = await request(baseURL).post("/post").set("Content-type", "application/json").set("Authorization", `Bearer ${token}`).send(validPost);
    createdPostId = response.body.data.resp._id;
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
  });
});

describe("POST /Comment", () => {
  let validComment = {
    name: "Mukesh",
    email: "agichamukesh@gmail.com",
    body: "This is a valid comment body"
  };
  let invalidComment = {
    name: "Mukesh"
  };
  
  it("should create valid Comment", async () => {
    const response = await request(baseURL).post(`/comment/${createdPostId}`).set("Content-type", "application/json").set("Authorization", `Bearer ${token}`).send(validComment);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
  });
  it("should return validation error", async () => {
    const response = await request(baseURL).post(`/comment/${createdPostId}`).set("Content-type", "application/json").set("Authorization", `Bearer ${token}`).send(invalidComment);
    expect(response.statusCode).toBe(500);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toEqual(
      expect.stringContaining("validation failed")
    );
  });
});

describe("Get /Comment", () => {
    it("should get a comment", async () => {
      const response = await request(baseURL).get(`/comment/${createdPostId}`).set("Content-type", "application/json").set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
    });
  });
