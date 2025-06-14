import { configDotenv } from "dotenv";
import mariadb, { Connection, ConnectionConfig } from "mariadb";

configDotenv();

const dbConfig: ConnectionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT), // Aquí estaba el error: usabas DB_PASSWORD
  database: process.env.DB_NAME
};

let connection: Connection;

// Función para conectar a la base de datos
async function connectToDatabase(): Promise<void> {
  connection = await mariadb.createConnection(dbConfig);
}

connectToDatabase();

export type Param = {
  greet: string;
  language: string;
};

// Clase para interactuar con la tabla "regards"
export class Greet {
  // Método para obtener todos los saludos
  static async findAll() {
    return await connection.query(
      'SELECT id, greet, language FROM regards'
    );
  }

  // Método para buscar saludo por ID
  static async findById(id: number) {
    const result = await connection.query(
      'SELECT id, greet, language FROM regards WHERE id = ?', [id]
    );
    return result[0];
  }

  // Método para insertar un nuevo saludo
  static async create(param: Param) {
    const insertResult = await connection.query(
      'INSERT INTO regards (greet, language) VALUES (?, ?)', 
      [param.greet, param.language]
    );

    // MariaDB no devuelve automáticamente el id con RETURNING, así que usamos insertId
    const insertedId = insertResult.insertId;

    const result = await connection.query(
      'SELECT id, greet, language FROM regards WHERE id = ?', [insertedId]
    );

    return result[0];
  }
}
