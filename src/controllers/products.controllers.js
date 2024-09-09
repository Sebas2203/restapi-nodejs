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
      .query(querys.addNewProduct);
    res.json({ name, description, quantity });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// optener producto por id

export const getProductById = async (req, res) => {
  const { id } = req.params;

  //realizamos una consulta
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("Id", id)
    .query(querys.getProductById);
  // console.log(result);

  res.send(result.recordset[0]);
};

// borrar producto por id

export const deleteProductById = async (req, res) => {
  const { id } = req.params;

  //realizamos una consulta
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("Id", id)
    .query(querys.deleteProduct);
  // console.log(result);

  // res.send(result);
  res.sendStatus(204);
};

//contar cuantos productos hay
export const getTotalProducts = async (req, res) => {
  //realizamos una consulta
  const pool = await getConnection();
  const result = await pool.request().query(querys.getTotalProducts);
  // console.log(result);

  res.json(result.recordset[0][""]);
};

//modificar productos
export const updateProductById = async (req, res) => {
  const { name, description, quantity } = req.body;
  const { id } = req.params;

  if (name == null || description == null || quantity === null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }

  const pool = await getConnection();
  await pool
    .request()
    .input("name", sql.VarChar, name)
    .input("description", sql.Text, description)
    .input("quantity", sql.Int, quantity)
    .input("id", sql.Int, id)
    .query(querys.updateProductById);

  res.json({ name, description, quantity });
};
