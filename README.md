# 📦 Coordinadora - Backend de Gestión de Envíos

Este es el backend de una aplicación logística para gestionar el envío de paquetes, optimizar rutas de entrega y permitir a los clientes rastrear sus pedidos en tiempo real. Desarrollado como parte de una prueba técnica, siguiendo principios de **Clean Architecture**, **TypeScript** y buenas prácticas profesionales.

## 🚀 Tecnologías utilizadas

- **Node.js + TypeScript**
- **Express**
- **MySQL + Docker**
- **Redis + Docker**
- **Zod** - Validación de datos
- **JWT** - Autenticación segura
- **Resend** - Correos transaccionales
- **OpenStreetMap API** - Validación de direcciones
- **WebSocket (`ws`)** - Seguimiento en tiempo real

## 📋 Historias de Usuario Implementadas

### HU1 - Registro y Autenticación de Usuarios
- ✅ Registro y Login de usuarios
- ✅ Validación con Zod y bcrypt
- ✅ Middleware de autenticación con JWT

### HU2 - Creación de Órdenes de Envío
- ✅ Creación de orden protegida
- ✅ Validación con OpenStreetMap
- ✅ Estado inicial "En espera" registrado en historial
- ✅ Notificación por correo electrónico

### HU3 - Gestión de Rutas y Asignaciones
- ✅ Asignación de rutas a órdenes
- ✅ Validación de transportistas y rutas
- ✅ Actualización de estado a "En tránsito"
- ✅ Envío de correo de asignación

### HU4 - Sistema de Seguimiento
- ✅ Seguimiento en tiempo real con WebSocket y Redis
- ✅ Historial completo de estados en MySQL
- ✅ Cambio a estado "Entregado" libera al transportista
- ✅ Emisión de notificaciones de estado por WebSocket


### HU5 - Reportes y Métricas de Envíos

- ✅ Endpoint para consultar reportes de envíos con filtros avanzados (`GET /api/reportes/envios`)
  - Filtros: rango de fechas, estado, transportista asignado, paginación
- ✅ Endpoint para obtener métricas agregadas (`GET /api/reportes/envios/metricas`)
  - Promedio de tiempo de entrega
  - Cantidad de envíos completados
- ✅ Implementación de Redis para almacenar en caché consultas frecuentes
- ✅ Optimización mediante índices en MySQL en columnas `status`, `changed_at`, `transportista_id`
- ✅ Cache manualmente limpiable (`DELETE /api/reportes/envios/cache`)
- ✅ Uso de JOINs y subconsultas en las consultas SQL para desempeño avanzado


## ⚙️ Configuración del Proyecto

1. Clonar el repositorio:
```bash
git clone https://github.com/SergioCamacho88/coordinadora_backend.git
cd coordinadora_backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar el archivo `.env`:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=logistics
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=tu_secreto_seguro
RESEND_API_KEY=re_xxxxxxx
SEND_EMAILS=true
```

4. Levantar los contenedores:
```bash
docker-compose up -d
```

5. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## 📡 API Endpoints

Incluye:
- `/api/auth/register`
- `/api/auth/login`
- `/api/orders`
- `/api/orders/:id/status`
- `/api/orders/:id/assign`
- `/api/orders/:id/history`
- `/api/reportes/envios`
- `/api/reportes/envios/metricas`
- `/api/reportes/envios/cache` (DELETE)

## 👤 Autor

Proyecto desarrollado por **Sergio Camacho** para Coordinadora.