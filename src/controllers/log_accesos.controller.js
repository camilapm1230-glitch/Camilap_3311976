import { pool } from "../db.js";

// GET todos los logs
export const getLogs = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT l.*, u.nombre, u.correo 
       FROM log_accesos l
       LEFT JOIN usuarios u ON l.usuario_id = u.id
       ORDER BY l.fecha DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener los logs" });
  }
};

// GET logs de un usuario específico
export const getLogsByUsuario = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const result = await pool.query(
      "SELECT * FROM log_accesos WHERE usuario_id = $1 ORDER BY fecha DESC",
      [usuario_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener los logs del usuario" });
  }
};

// POST registrar un log
export const createLog = async (req, res) => {
  try {
    const { usuario_id, accion } = req.body;

    const result = await pool.query(
      `INSERT INTO log_accesos (usuario_id, accion)
       VALUES ($1, $2)
       RETURNING *`,
      [usuario_id, accion]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al registrar el log" });
  }
};

// DELETE eliminar un log
export const deleteLog = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM log_accesos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Log no encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar el log" });
  }
};
