import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Gestión de Envíos y Rutas Logísticas",
    version: "1.0.0",
    description:
      "Documentación de la API para el sistema de envíos de Coordinadora",
  },
  servers: [
    {
      url: "http://localhost:3000", // Cambia según tu entorno
      description: "Servidor de desarrollo",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      CreateOrder: {
        type: "object",
        required: ["peso", "dimensiones", "tipoProducto", "direccionDestino"],
        properties: {
          peso: { type: "number", example: 2.5 },
          dimensiones: { type: "string", example: "30x20x15 cm" },
          tipoProducto: { type: "string", example: "Electrónica" },
          direccionDestino: {
            type: "string",
            example: "Calle 123 #45-67 Bogotá",
          },
        },
      },
      AssignOrder: {
        type: "object",
        required: ["rutaId", "transportistaId"],
        properties: {
          rutaId: { type: "integer", example: 5 },
          transportistaId: { type: "integer", example: 10 },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  // Especificar la ruta donde Swagger buscará tus endpoints documentados
  apis: [
    "./src/routes/**/*.ts",
    "./src/controllers/**/*.ts",
    "./src/modules/orders/orders.routes.ts",
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
