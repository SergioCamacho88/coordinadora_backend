# 📦 Coordinadora - Backend de Gestión de Envíos

Este es el backend de una aplicación logística para gestionar el envío de paquetes, optimizar rutas de entrega y permitir a los clientes rastrear sus pedidos. Desarrollado como parte de una prueba técnica, siguiendo principios de **Clean Architecture**, **TypeScript** y buenas prácticas profesionales.

Repositorio: 👉 [https://github.com/SergioCamacho88/coordinadora_backend](https://github.com/SergioCamacho88/coordinadora_backend)

---

## 🚀 Tecnologías usadas

- **Node.js + TypeScript**
- **Express**
- **MySQL + Docker**
- **Redis + Docker**
- **Zod** (validación de datos)
- **JWT** (autenticación)
- **Resend** (envío de emails)
- **OpenStreetMap API** (validación de direcciones)
- **Clean Architecture**

---

## 📦 Funcionalidades por HU

### ✅ HU1 - Registro y autenticación

- Registro de usuario (`/api/auth/register`)
- Login con JWT (`/api/auth/login`)
- Validación de entrada con `zod`
- Contraseña encriptada con `bcrypt`
- Middleware `authenticate` para rutas protegidas

---

### ✅ HU2 - Creación de órdenes de envío

- Ruta protegida `POST /api/orders`
- Validación con `zod`
- Validación de dirección real usando OpenStreetMap
- Estado inicial: `En espera`
- Correo de confirmación al usuario vía Resend
- Plantilla HTML profesional reutilizable para el email

---

### ✅ HU3 - Asignación de rutas a los envíos

- Ruta protegida solo para admin: `POST /api/orders/:id/assign`
- Validación de:
  - existencia de la orden y estado "En espera"
  - disponibilidad y capacidad del transportista
  - existencia de la ruta
- Actualiza el estado de la orden a `"En tránsito"`
- Envía un correo de asignación con resumen
- Endpoints adicionales para el dashboard:
  - `GET /api/orders?status=En espera` → listar órdenes por estado
  - `GET /api/rutas` → listar rutas
  - `GET /api/transportistas?disponible=true` → listar transportistas disponibles
- Middleware `isAdmin` protege todos los endpoints del dashboard

---

## ⚙️ Configuración local

### 1. Clona el repositorio

```bash
git clone https://github.com/SergioCamacho88/coordinadora_backend.git
cd coordinadora_backend
```

### 2. Instala dependencias

```bash
npm install
```

### 3. Variables de entorno

Crea un archivo `.env`:

```env
PORT=3000

# MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=logistics

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=supersecreto

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxx
```

---

## 🐳 Docker para MySQL + Redis

### `docker-compose.yml` incluido con:

- MySQL (puerto 3306)
- Redis (puerto 6379)
- phpMyAdmin (puerto 8080)

### Comando:

```bash
docker-compose up -d
```

---

## ▶️ Correr el backend

```bash
npm run dev
```

---

## 🧪 Pruebas útiles

### Crear orden (usuario)
```http
POST /api/orders
Authorization: Bearer <token>
```

### Asignar orden (admin)
```http
POST /api/orders/:id/assign
Authorization: Bearer <admin_token>
```

### Filtrar órdenes
```http
GET /api/orders?status=En espera
Authorization: Bearer <admin_token>
```

### Listar rutas y transportistas
```http
GET /api/rutas
GET /api/transportistas?disponible=true
Authorization: Bearer <admin_token>
```

---

## 🧠 Arquitectura de carpetas

```bash
src/
├── config/              # Conexiones a MySQL, Redis
├── controllers/         # HTTP handlers
├── routes/              # Rutas Express
├── middlewares/         # Autenticación, validación de roles
├── usecases/            # Lógica de negocio
├── repositories/        # Consultas a BD
├── services/            # Emails, JWT, hashing
├── templates/           # HTML para correos
├── schemas/             # Validaciones Zod
├── entities/            # Modelos de dominio
└── index.ts             # Punto de entrada
```

---

## ✉️ Contacto

Este proyecto fue desarrollado por **Sergio Camacho** como parte de una prueba técnica para Coordinadora.

Repositorio: [github.com/SergioCamacho88/coordinadora_backend](https://github.com/SergioCamacho88/coordinadora_backend)