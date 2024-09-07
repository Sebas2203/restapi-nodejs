import sql from "mssql";

//configurando la base de datos
const dbSettings = {
  //lo que ocupamos para conectarnos la base datos
  user: "sebas",
  password: "sebas123456789",
  server: "localhost",
  database: "webstore",
  options: {
    encrypt: true, //for azure
    trustServerCertificate: true, //change to true for local dev / self-signed certs
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(dbSettings); //funcion asincrona //con esta variable se pueden hacer consultas
    return pool;
  } catch (error) {
    console.error(error);
  }

  //para probar la conexion
  // const result = await pool.request().query("SELECT 1");
  // console.log(result);
}

export { sql };
