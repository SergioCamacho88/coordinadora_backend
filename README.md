# coordinadora_backend

coordinadora_backend/
├── src/
│   ├── config/           # Configuración de Redis, MySQL, variables de entorno
│   ├── controllers/      # Lógica HTTP, reciben req/res
│   ├── routes/           # Rutas de la API
│   ├── middlewares/      # Middleware como auth, validaciones, etc
│   ├── usecases/         # Casos de uso (business logic)
│   ├── services/         # Lógica externa como JWT, Redis, mail, etc
│   ├── repositories/     # Consultas a base de datos
│   ├── entities/         # Definición de entidades y modelos de dominio
│   ├── database/         # Configuración y migraciones
│   ├── utils/            # Funciones auxiliares
│   └── index.ts          # Punto de entrada
├── .env
├── tsconfig.json
├── package.json

