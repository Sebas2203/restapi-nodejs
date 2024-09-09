// se guardan las consultas de la db
export default {
  getAllProducts: "SELECT * FROM Products",
  addNewProduct:
    "INSERT INTO Products (name, description,quantity) VALUES (@name, @description, @quantity)",
};
