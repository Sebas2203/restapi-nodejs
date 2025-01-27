//este archivo tiene las urls
import { Router } from "express"; // nos permite crear urls

import {
  creatNewPoduct,
  getProducts,
  getProductById,
  deleteProductById,
  getTotalProducts,
  updateProductById,
} from "../controllers/products.controllers.js";

const router = Router();

//--definir las rutas--
router.get("/products", getProducts);

//ruta para crear productos
router.post("/products", creatNewPoduct);

//contar cuantos productos tenemos actualmente
router.get("/products/count", getTotalProducts);

//ruta para tener un producto por id
router.get("/products/:id", getProductById);

//ruta para borrar productos
router.delete("/products/:id", deleteProductById);

//ruta para editar productos
router.put("/products/:id", updateProductById);

export default router;
