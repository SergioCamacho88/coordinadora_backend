# 📦 Coordinadora - Backend de Gestión de Envíos

Este es el backend de una aplicación logística para gestionar el envío de paquetes, optimizar rutas de entrega y permitir a los clientes rastrear sus pedidos en tiempo real. Desarrollado como parte de una prueba técnica, siguiendo principios de **Clean Architecture**, **TypeScript** y buenas prácticas profesionales.

## 🚀 Tecnologías utilizadas

- **Node.js + TypeScript** - Backend robusto y tipado
- **Express** - Framework web
- **MySQL + Docker** - Base de datos principal
- **Redis + Docker** - Caché y seguimiento en tiempo real
- **Zod** - Validación de datos
- **JWT** - Autenticación segura
- **Resend** - Servicio de correos transaccionales
- **OpenStreetMap API** - Validación de direcciones
- **Clean Architecture** - Arquitectura escalable y mantenible

## 📋 Historias de Usuario Implementadas

### HU1 - Registro y Autenticación de Usuarios

- ✅ Registro de usuario (`POST /api/auth/register`)
- ✅ Login con JWT (`POST /api/auth/login`)
- ✅ Validación de datos con Zod
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Middleware de autenticación para rutas protegidas

### HU2 - Creación de Órdenes de Envío

- ✅ Endpoint protegido (`POST /api/orders`)
- ✅ Validación completa de datos de entrada
- ✅ Verificación de dirección con OpenStreetMap
- ✅ Estado inicial "En espera" registrado en historial
- ✅ Correo de confirmación con plantilla HTML profesional

### HU3 - Gestión de Rutas y Asignaciones

- ✅ Asignación de rutas (`POST /api/orders/:id/assign`) - Solo admin
- ✅ Validaciones:
  - Existencia y estado de la orden
  - Capacidad del transportista
  - Disponibilidad de ruta
- ✅ Actualización a estado "En tránsito"
- ✅ Notificación por correo
- ✅ Endpoints para dashboard:
  - `GET /api/orders` - Filtrado por estado
  - `GET /api/routes` - Listado de rutas
  - `GET /api/carriers` - Transportistas disponibles

### HU4 - Sistema de Seguimiento

- ✅ Seguimiento en tiempo real con Redis
- ✅ Historial completo en MySQL
- ✅ Cambio a estado "Entregado":
  - Libera automáticamente al transportista
  - Envía confirmación por correo
- ✅ Timeline del envío (`GET /api/orders/:id/timeline`)
- ✅ Notificaciones en tiempo real de cambios de estado

## ⚙️ Configuración del Proyecto

### Prerrequisitos

- Node.js >= 18
- Docker y Docker Compose
- npm o yarn

### Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/SergioCamacho88/coordinadora_backend.git
cd coordinadora_backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno (`.env`):
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
JWT_SECRET=tu_secreto_seguro

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxx
```

### 🐳 Contenedores Docker

Levanta los servicios necesarios:
```bash
docker-compose up -d
```

Incluye:
- MySQL (puerto 3306)
- Redis (puerto 6379)
- phpMyAdmin (puerto 8080)

### Iniciar el servidor

```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
src/
├── config/              # Configuraciones (DB, Redis, etc.)
├── controllers/         # Controladores HTTP
├── routes/             # Definición de rutas
├── middlewares/        # Middlewares (auth, validation)
├── usecases/          # Lógica de negocio
├── repositories/       # Acceso a datos
├── services/          # Servicios externos (email, etc.)
├── templates/         # Plantillas de correo
├── schemas/           # Esquemas de validación
├── entities/          # Modelos de dominio
└── index.ts           # Punto de entrada

```

## 📡 API Endpoints

### 🔐 Autenticación

#### Registro de Usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Sergio Admin",
  "email": "usuario@ejemplo.com",
  "password": "123456"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "123456"
}
```

### 📦 Gestión de Órdenes

#### Crear Nueva Orden
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "weight": 5.5,
  "dimensions": "40x30x20",
  "productType": "Electrónica",
  "destinationAddress": "Carrera 15 # 80 - 20, bogota"
}
```

#### Listar Órdenes
```http
GET /api/orders
Authorization: Bearer <token>
```

#### Filtrar Órdenes por Estado
```http
GET /api/orders?status=En espera
Authorization: Bearer <token>
```

#### Consultar Estado de una Orden
```http
GET /api/orders/{orderId}/status
Authorization: Bearer <token>
```

#### Asignar Orden (Solo Admin)
```http
POST /api/orders/{orderId}/assign
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "rutaId": 1,
  "transportistaId": 2
}
```

#### Actualizar Estado de Orden (Solo Admin)
```http
PUT /api/orders/{orderId}/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "Entregado"
}
```

### 🚛 Gestión de Rutas y Transportistas

#### Listar Rutas
```http
GET /api/rutas
Authorization: Bearer <admin_token>
```

#### Listar Todos los Transportistas
```http
GET /api/transportistas
Authorization: Bearer <admin_token>
```

#### Listar Transportistas Disponibles
```http
GET /api/transportistas?disponible=true
Authorization: Bearer <admin_token>
```

### 🔍 Debugging (Solo Admin)

#### Consultar Estado en Redis
```http
GET /api/debug/redis/order:{orderId}:status
Authorization: Bearer <admin_token>
```

#### Consultar Redis General
```http
GET /api/debug/redis
Authorization: Bearer <admin_token>
```

## 🔑 Estados de Orden

Los estados posibles para una orden son:
- `En espera` - Estado inicial al crear la orden
- `En tránsito` - Cuando se asigna a un transportista
- `Entregado` - Estado final, libera al transportista

## 🔒 Roles y Permisos

- **Usuario Regular**:
  - Crear órdenes
  - Consultar sus propias órdenes
  - Ver estado de sus envíos

- **Administrador**:
  - Todas las acciones de usuario regular
  - Asignar órdenes a transportistas
  - Gestionar rutas y transportistas
  - Cambiar estados de órdenes
  - Acceder a endpoints de debugging

## 👤 Autor

Este proyecto fue desarrollado por **Sergio Camacho** como parte de una prueba técnica para Coordinadora.

Repositorio: [github.com/SergioCamacho88/coordinadora_backend](https://github.com/SergioCamacho88/coordinadora_backend)