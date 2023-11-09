CREATE DATABASE IF NOT EXISTS InventarioDB;
USE InventarioDB;

CREATE TABLE roles (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuarios (
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    role_id INT NOT NULL,
    active TINYINT NOT NULL DEFAULT 1,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS marcas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  categoria_id INT NOT NULL,
  marca_id INT NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  active TINYINT NOT NULL DEFAULT 1, -- Soft delete para productos
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id),
  FOREIGN KEY (marca_id) REFERENCES marcas(id)
);

CREATE TABLE IF NOT EXISTS listas_precios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  activa BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_inicio DATE,
  fecha_fin DATE
);

CREATE TABLE IF NOT EXISTS precios_productos (
  producto_id INT NOT NULL,
  lista_precio_id INT NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (producto_id) REFERENCES productos(id),
  FOREIGN KEY (lista_precio_id) REFERENCES listas_precios(id),
  PRIMARY KEY (producto_id, lista_precio_id)
);

CREATE TABLE IF NOT EXISTS inventario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  producto_id INT NOT NULL,
  cantidad INT DEFAULT 0,
  tipo ENUM('entrada', 'salida') NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Tabla de estados de pedido
CREATE TABLE IF NOT EXISTS estados_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usuario_id INT,
  estado_pedido_id INT NOT NULL,
  active TINYINT NOT NULL DEFAULT 1, -- Soft delete para pedidos
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (estado_pedido_id) REFERENCES estados_pedido(id)
);

-- Tabla de detalles del pedido
CREATE TABLE IF NOT EXISTS detalles_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  active TINYINT NOT NULL DEFAULT 1, -- Soft delete para detalles de pedidos
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Tabla para auditoría de acciones de usuarios
CREATE TABLE IF NOT EXISTS auditoria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  accion VARCHAR(255) NOT NULL,
  descripcion TEXT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

# Segunda revision añadir mas tablas y relaciones

-- Añadido para la gestión de almacenes o bodegas
CREATE TABLE IF NOT EXISTS almacenes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL UNIQUE,
  ubicacion VARCHAR(255),
  descripcion TEXT,
  active TINYINT NOT NULL DEFAULT 1
);

-- Relacionar inventario con almacenes
ALTER TABLE inventario ADD COLUMN almacen_id INT DEFAULT NULL;
ALTER TABLE inventario ADD FOREIGN KEY (almacen_id) REFERENCES almacenes(id);

-- Tabla de proveedores
CREATE TABLE IF NOT EXISTS proveedores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  direccion VARCHAR(255),
  telefono VARCHAR(20),
  email VARCHAR(100),
  descripcion TEXT,
  active TINYINT NOT NULL DEFAULT 1
);

-- Tabla de compra de productos
CREATE TABLE IF NOT EXISTS compras (
  id INT AUTO_INCREMENT PRIMARY KEY,
  proveedor_id INT NOT NULL,
  fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);

-- Detalles de la compra
CREATE TABLE IF NOT EXISTS detalles_compra (
  id INT AUTO_INCREMENT PRIMARY KEY,
  compra_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL,
  precio_compra DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (compra_id) REFERENCES compras(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Tabla de lotes de productos
CREATE TABLE IF NOT EXISTS lotes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  producto_id INT NOT NULL,
  numero_lote VARCHAR(50) NOT NULL,
  fecha_vencimiento DATE,
  cantidad INT NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Para rastrear la movilidad del producto en detalle
CREATE TABLE IF NOT EXISTS movimientos_producto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo ENUM('entrada', 'salida') NOT NULL,
  cantidad INT NOT NULL,
  producto_id INT NOT NULL,
  lote_id INT,
  almacen_id INT,
  fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_id) REFERENCES productos(id),
  FOREIGN KEY (lote_id) REFERENCES lotes(id),
  FOREIGN KEY (almacen_id) REFERENCES almacenes(id)
);

-- Añadido de la relación producto-proveedor
CREATE TABLE IF NOT EXISTS productos_proveedores (
  producto_id INT NOT NULL,
  proveedor_id INT NOT NULL,
  FOREIGN KEY (producto_id) REFERENCES productos(id),
  FOREIGN KEY (proveedor_id) REFERENCES proveedores(id),
  PRIMARY KEY (producto_id, proveedor_id)
);