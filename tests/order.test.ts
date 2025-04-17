import request from "supertest";
import app from "../src/app";

describe("Order Endpoints", () => {
  const api = request(app);
  let token: string;

  const testUser = {
    name: "Usuario Orden",
    email: `orderuser${Math.random().toString(36).substring(2, 15)}@mail.com`,
    password: "Test1234",
  };

  beforeAll(async () => {
    // Registramos el usuario
    await api.post("/api/auth/register").send(testUser);

    // Hacemos login para obtener el token
    const res = await api.post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    token = res.body.token;
  });

  it("debe crear una orden exitosamente", async () => {
    const res = await api
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        weight: 2.5,
        dimensions: "30x20x15",
        productType: "Documentos",
        destinationAddress: "Calle 123, Bogotá",
      });

    console.log(res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Orden creada correctamente");
    
  });
});
