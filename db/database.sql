-- Crear base de datos
CREATE DATABASE sistema_login;

-- Conectar a la base de datos
\c sistema_login;

-- =========================
-- Tabla usuarios
-- =========================
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    documento VARCHAR(50),
    ciudad VARCHAR(100),
    rol VARCHAR(50),
    correo VARCHAR(150) UNIQUE,
    password VARCHAR(255),
    telefono VARCHAR(20),
    ficha VARCHAR(50),
    tipo_documento VARCHAR(50),
    sexo VARCHAR(20),
    fecha_nacimiento DATE,
    jornada VARCHAR(50),
    centro_formacion VARCHAR(150),
    resultados VARCHAR(255),
    tipo_instructor VARCHAR(50),
    centro_gestion VARCHAR(150)
);

-- =========================
-- Tabla log_accesos
-- =========================
CREATE TABLE log_accesos (
    id SERIAL PRIMARY KEY,
    usuario_id INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accion VARCHAR(255),
    CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);
