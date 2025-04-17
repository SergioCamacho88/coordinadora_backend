# 🚚 Coordinadora Backend

Sistema backend para gestión de envíos, asignación de rutas logísticas, y seguimiento de órdenes en tiempo real.

Desarrollado como parte de la **Prueba Técnica Fullstack - Coordinadora (Abril 2025)**.

---

## 👨‍💻 Autor

- **Nombre:** Sergio Camacho
- **Telfono:** 3203598325
- **Fecha:** Abril 2025

---

## 📚 Tecnologías principales

- **Node.js + TypeScript**
- **Express** - Framework para APIs HTTP
- **MySQL + Docker** - Base de datos relacional y contenedorización para local
- **Redis + Docker** - Cache y suscripciones en tiempo real (y Redis Mock en test)
- **Zod** - Validación segura de datos de entrada
- **JWT** - Autenticación segura basada en tokens
- **Resend** - Servicio para envío de correos transaccionales
- **OpenStreetMap API** - Validación de direcciones de envío
- **WebSocket (`ws`)** - Seguimiento en tiempo real del estado de las órdenes
- **Jest + Supertest** - Testing unitario y de integración
- **ioredis-mock** - Simulación de Redis en ambiente de pruebas
- **Docker Compose** - Orquestación de contenedores locales


---

## 🚀 Scripts disponibles

| Script | Acción |
|:-------|:-------|
| `npm run dev` | Ejecuta el servidor en desarrollo (`ts-node-dev`) |
| `npm run build` | Compila TypeScript a `/dist` |
| `npm run start` | Ejecuta servidor desde `/dist` |
| `npm run test` | Ejecuta pruebas automáticas usando Redis Mock |

---

## 📖 Historias de Usuario Implementadas

- ✅ HU1: Registro y autenticación de usuarios
- ✅ HU2: Creación de órdenes de envío
- ✅ HU3: Asignación de rutas a los envíos
- ✅ HU4: Seguimiento del estado del envío en tiempo real
- ✅ HU5: Consulta avanzada de envíos y desempeño logístico

---

## 🧪 Pruebas automáticas

Este proyecto implementa pruebas automáticas que cubren:

- Registro y login de usuarios
- Creación y actualización de órdenes
- Asignación de rutas
- Consulta de reportes y métricas

**Notas:**
- En ambiente de testing (`NODE_ENV=test`) se usa `ioredis-mock` para Redis.
- No es necesario levantar servicios externos reales para correr los tests.

```bash
npm run test
```

---

## ⚙️ Variables de entorno necesarias (.env)

```env
# Configuración general
PORT=3000

# Base de datos MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=logistics

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=supersecreto123

# Servicio de envío de correos (Resend)
RESEND_API_KEY=tu_resend_api_key
RESEND_EMAIL_FROM=no-responder@tudominio.com

# WebSocket
WS_URL=http://localhost:3000

```


---

## 📦 Estructura del Proyecto

```
src/
  ├── config/               # Configuración de MySQL, Redis, WebSocket
  ├── controllers/          # Controladores de rutas
  ├── database/             # Scripts SQL para estructura de base de datos
  ├── entities/             # Entidades del dominio
  ├── middlewares/          # Middlewares de autenticación y validaciones
  ├── repositories/         # Acceso a datos (MySQL y Redis)
  ├── routes/               # Definición de endpoints
  ├── schemas/              # Validaciones con Zod
  ├── services/             # Servicios como envío de mails y validaciones de datos
  ├── templates/            # Templates de correos electrónicos
  ├── types/                # Tipado extendido de Express
  ├── usecases/             # Casos de uso de negocio (Clean Architecture)
  ├── utils/                # Utilidades auxiliares (JWT, hashing)
  ├── websocket-client/     # Cliente WebSocket de prueba

```

---
## 📡 Principales Endpoints de la API

## 📡 Principales Endpoints de la API

| Método | Endpoint | Descripción | Requiere Token |
|:-------|:---------|:------------|:--------------|
| `POST` | `/api/auth/register` | Registro de nuevos usuarios | ❌ No |
| `POST` | `/api/auth/login` | Autenticación de usuarios, devuelve token JWT | ❌ No |
| `POST` | `/api/orders` | Creación de nuevas órdenes de envío | ✅ Sí |
| `PUT` | `/api/orders/:id/status` | Actualización del estado de una orden | ✅ Sí |
| `POST` | `/api/orders/assign` | Asignar orden a transportista disponible (solo admins) | ✅ Sí |
| `GET` | `/api/reportes/envios` | Consulta avanzada de envíos con filtros (solo admins) | ✅ Sí |
| `GET` | `/api/reportes/envios/metricas` | Consulta de métricas logísticas (solo admins) | ✅ Sí |
| `WebSocket` | `/ws` | Seguimiento en tiempo real del estado de órdenes (token obligatorio en conexión) | ✅ Sí |

---

## 📡 Funcionalidades Clave

- **Registro y Login** seguro usando JWT.
- **Creación y asignación de órdenes** a transportistas.
- **Seguimiento en tiempo real** de cambios de estado vía WebSocket.
- **Notificaciones por correo electrónico** en cada cambio importante.
- **Cacheo de reportes** usando Redis para mejor desempeño.
- **Pruebas unitarias e integración** de todos los flujos principales.

---