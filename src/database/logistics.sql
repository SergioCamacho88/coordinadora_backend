-- Asegúrate de estar usando la base de datos correcta
CREATE DATABASE IF NOT EXISTS logistics;
USE logistics;

-- Tabla: Usuarios
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: Órdenes de envío
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  weight DECIMAL(10,2) NOT NULL,
  dimensions VARCHAR(100),
  product_type VARCHAR(100),
  destination_address TEXT NOT NULL,
  status ENUM('En espera', 'En tránsito', 'Entregado') DEFAULT 'En espera',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla: Rutas
CREATE TABLE rutas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: Transportistas
CREATE TABLE transportistas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  capacity INT NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: Asignaciones de órdenes a rutas y transportistas
CREATE TABLE order_assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  ruta_id INT NOT NULL,
  transportista_id INT NOT NULL,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (ruta_id) REFERENCES rutas(id) ON DELETE CASCADE,
  FOREIGN KEY (transportista_id) REFERENCES transportistas(id) ON DELETE CASCADE
);
