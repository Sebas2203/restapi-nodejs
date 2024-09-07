import { getConnection, sql } from "../database/connection.js";
import querys from "../database/querys.js";

export const getProducts = async (req, res) => {
  try {
    const pool = await getConnection(); // se llama la conexion y returnal el pull desde la coneccion de la db
    const result = await pool.request().query(querys.getAllProducts); // con el pool se hace una peticion(request) y la peticion es hacer una consulta (query)

    // console.log(result);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// añadir datos desde una post
export const creatNewPoduct = async (req, res) => {
  //recibimos todos los datos del cliente
  const { name, description } = req.body; //name y description no se cambian
  let { quantity } = req.body; // quantity se guarda en una quantity porque su valor puede cambiar

  //Validar que lleguen todos los datos
  if (name == null || description == null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }

  if (!quantity) quantity = 0;
  // console.log(name, description, quantity);

  //realizar la consulta
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.Text, description)
      .input("quantity", sql.Int, quantity)
      .query(
        "INSERT INTO Products (name, description,quantity) VALUES (@name, @description, @quantity)"
      );
    res.json({ name, description, quantity });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
