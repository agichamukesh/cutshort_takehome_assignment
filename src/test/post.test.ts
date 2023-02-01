const request = require("supertest");
const baseURL = "http://localhost:8000/api";

let token = "";
let createdPostId;
describe("GET /Posts", () => {
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

  it("should return 200 for posts", async () => {
    const response = await request(baseURL).get("/post").set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });
  it("should return post", async () => {
    const response = await request(baseURL).get("/post").set('Authorization', `Bearer ${token}`);
    expect(Array.isArray(response.body.data.resp)).toBe(true);
    expect(response.body.data.resp.length >= 0).toBe(true);
  });
});

describe("POST /post", () => {
    let validPost = {
        title : "This is a test post, a valid one",
        body: "This is a valid post body"
    };
    let invalidPost = {
        title: 'Sample title'
    };
    it("should create valid Post", async () => {
      const response = await request(baseURL).post("/post").set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`).send(validPost);
      createdPostId = response.body.data.resp._id;
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
    });
    it("should return validation error", async () => {
        const response = await request(baseURL).post("/post").set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`).send(invalidPost);
        expect(response.statusCode).toBe(500);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toEqual(expect.stringContaining('validation failed'));
    });
});

  describe("PUT /Post", () => {
    let updatedPost = {
        title : "This title will be updated in test case"
    };
    it("should update the valid Post", async () => {
      const response = await request(baseURL).put(`/post/${createdPostId}`).set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`).send(updatedPost);
      createdPost = response.body.data.resp._id;
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.resp.title).toEqual(expect.stringContaining(updatedPost.title));
    });
    it("should return error 404 when Params is not passed", async () => {
        const response = await request(baseURL).put("/post").set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`).send(updatedPost);
        expect(response.statusCode).toBe(404);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toEqual(expect.stringContaining('not found'));
    });
  });

  describe("Delete /Post", () => {
    it("should Delete the Post created for testing", async () => {
      const response = await request(baseURL).delete(`/post/${createdPostId}`).set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
    });
  });