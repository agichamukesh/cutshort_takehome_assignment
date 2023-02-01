const request = require("supertest");
const baseURL = "http://localhost:8000/api";

let token = "";
let createdPostId;
describe("GET /todos", () => {
  beforeAll(async () => {
    let loginBody = {
      email: "agichamukesh@gmail.com",
      password: "sample@123"
    };
    const response = await request(baseURL)
      .post("/auth/login")
      .set('Content-type', 'application/json')
      .send(loginBody);
    token = response.body.access_token;
  });

  it("should return 200", async () => {
    const response = await request(baseURL).get("/todo").set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });
  it("should return todos", async () => {
    const response = await request(baseURL).get("/todo").set('Authorization', `Bearer ${token}`);
    expect(Array.isArray(response.body.data.resp)).toBe(true);
    expect(response.body.data.resp.length >= 0).toBe(true);
  });
});

describe("POST /todos", () => {
    let validToDO = {
        title : "This is a test todo, a valid one"
    };
    let invalidToDo = {
        status: 'inprogress'
    };
    it("should create valid ToDo", async () => {
      const response = await request(baseURL).post("/todo").set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`).send(validToDO);
      createdPostId = response.body.data.resp._id;
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
    });
    it("should return validation error", async () => {
        const response = await request(baseURL).post("/todo").set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`).send(invalidToDo);
        expect(response.statusCode).toBe(500);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toEqual(expect.stringContaining('validation failed'));
    });
  });

  describe("PUT /todos", () => {
    let updatedToDo = {
        title : "This title will be updated in test case"
    };
    it("should update the valid ToDo", async () => {
      const response = await request(baseURL).put(`/todo/${createdPostId}`).set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`).send(updatedToDo);
      createdPost = response.body.data.resp._id;
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.resp.title).toEqual(expect.stringContaining(updatedToDo.title));
    });
    it("should return error 404 when Params is not passed", async () => {
        const response = await request(baseURL).put("/todo").set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`).send(updatedToDo);
        expect(response.statusCode).toBe(404);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toEqual(expect.stringContaining('not found'));
    });
  });

  describe("Delete /todos", () => {
    it("should Delete the ToDo created for testing", async () => {
      const response = await request(baseURL).delete(`/todo/${createdPostId}`).set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
    });
  });