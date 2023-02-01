const request = require("supertest");
const baseURL = "http://localhost:8000/api";

let token = "";
let adminToken = "";
let adminUser = {
    name: "addminUser",
    email: `sampleEmail@gmail.com_${Date.now()}`,
    password: "sample@123",
    passwordConfirm: "sample@123",
    role: "admin"
  };
let regularUser = {
    name: "user",
    email: `sampleEmail@gmail.com_${Date.now()+1}`,
    password: "sample@123",
    passwordConfirm: "sample@123",
};
let invalidUser = {
    name: "addminUser",
    email: `sampleEmail@gmail.com_${Date.now()+2}`,
    password: "sample@123",
    passwordConfirm: "sample@213",
    role: "admin"
};

describe("Post /users", () => {
it("should return create admin user", async () => {
    const response = await request(baseURL).post("/auth/register").send(adminUser);
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data.user.role).toBe('admin');
  });
it("should create normal user", async () => {
    const regularReponse = await request(baseURL).post("/auth/register").send(regularUser);
    expect(regularReponse.statusCode).toBe(201);
    expect(regularReponse.body.status).toBe('success');
    expect(regularReponse.body.data.user.role).toBe('user');
  });
it("should return validation error", async () => {
    const invalidResp = await request(baseURL).post("/auth/register").send(invalidUser);
    expect(invalidResp.statusCode).toBe(400);
    expect(invalidResp.body.status).toBe('fail');
    expect(invalidResp.body.error[0].message).toBe('Passwords do not match');
  });
});

describe("Login /users", () => {
    it("should Login user", async () => {
        const response = await request(baseURL).post("/auth/login").set('Content-type', 'application/json').send({email : adminUser.email, password: adminUser.password});
        adminToken = response.body.access_token;    
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('success');
    });
    it("should login admin user", async () => {
        const adminResponse = await request(baseURL).post("/auth/login").set('Content-type', 'application/json').send({email: regularUser.email, password: regularUser.password});
        token = adminResponse.body.access_token;    
        expect(adminResponse.statusCode).toBe(200);
        expect(adminResponse.body.status).toBe('success');
    });
  });

describe("Get /Users", () => {
  it("should Allow admin users to access", async () => {
      const response = await request(baseURL).get(`/users`).set('Content-type', 'application/json').set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
  });
  it("should Deny access to normal users", async () => {
      const response = await request(baseURL).get(`/users`).set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(403);
      expect(response.body.status).toBe('fail');
  });
});