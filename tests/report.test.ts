import request from "supertest";
import app from "../src/app";
import { db } from "../src/config/mysql";

describe("Report Endpoints", () => {
  const api = request(app);
  let adminToken: string;

  const testAdmin = {
    email: `adminuser${Math.random().toString(36).substring(2, 15)}@mail.com`,
    password: "Admin1234",
    name: "Admin Reporte",
  };

  beforeAll(async () => {
    // Registrar admin
    await api.post("/api/auth/register").send({
      name: testAdmin.name,
      email: testAdmin.email,
      password: testAdmin.password,
    });

    // Actualizar manualmente el rol a admin
    await db.query(`UPDATE users SET role = 'admin' WHERE email = ?`, [
      testAdmin.email,
    ]);

    // Login para obtener token
    const res = await api.post("/api/auth/login").send({
      email: testAdmin.email,
      password: testAdmin.password,
    });

    adminToken = res.body.token;
  });

  it("debe consultar reportes de envíos exitosamente", async () => {
    // Crear la orden
    const orderRes = await api
      .post("/api/orders")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        weight: 1.5,
        dimensions: "10x10x10",
        productType: "Libros",
        destinationAddress: "Calle 100, Bogotá",
      });

    const orderId = orderRes.body.orderId;
    console.log("Orden creada, ID:", orderId);

    // Cambio a "En tránsito"
    const updateRes1 = await api
      .put(`/api/orders/${orderId}/status`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "En tránsito" });

    console.log(
      "Cambio a En tránsito:",
      updateRes1.statusCode,
      updateRes1.body
    );

    // Cambio a "Entregado"
    const updateRes2 = await api
      .put(`/api/orders/${orderId}/status`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "Entregado" });

    console.log("Cambio a Entregado:", updateRes2.statusCode, updateRes2.body);

    // Consultar reporte
    const res = await api
      .get("/api/reportes/envios")
      .set("Authorization", `Bearer ${adminToken}`)
      .query({
        pagina: 1,
        limite: 5,
      });

    console.log("Respuesta reporte:", res.statusCode, res.body);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("debe consultar métricas de envíos exitosamente", async () => {
    const res = await api
      .get("/api/reportes/envios/metricas")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("tiempoPromedioHoras");
  });
});
