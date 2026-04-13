import { pool } from "../db.js";

// GET todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// GET un usuario por ID
export const getUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

// POST crear usuario
export const createUsuario = async (req, res) => {
  try {
    const {
      nombre, apellido, documento, ciudad, rol, correo, password,
      telefono, ficha, tipo_documento, sexo, fecha_nacimiento,
      jornada, centro_formacion, resultados, tipo_instructor, centro_gestion,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO usuarios 
        (nombre, apellido, documento, ciudad, rol, correo, password, telefono, ficha,
         tipo_documento, sexo, fecha_nacimiento, jornada, centro_formacion, resultados,
         tipo_instructor, centro_gestion)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
       RETURNING *`,
      [
        nombre, apellido, documento, ciudad, rol, correo, password,
        telefono, ficha, tipo_documento, sexo, fecha_nacimiento,
        jornada, centro_formacion, resultados, tipo_instructor, centro_gestion,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear el usuario" });
  }
};

// PATCH actualizar usuario (solo campos enviados)
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body;

    const keys = Object.keys(fields);
    if (keys.length === 0) {
      return res.status(400).json({ message: "No se enviaron campos para actualizar" });
    }

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const values = Object.values(fields);
    values.push(id);

    const result = await pool.query(
      `UPDATE usuarios SET ${setClause} WHERE id = $${values.length} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

// DELETE eliminar usuario
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};
