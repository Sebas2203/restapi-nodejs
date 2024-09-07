//este archivo tiene las urls
import { Router } from "express"; // nos permite crear urls

import {
  creatNewPoduct,
  getProducts,
} from "../controllers/products.controllers.js";

const router = Router();

//--definir las rutas--
router.get("/products", getProducts);

//ruta para crear productos
router.post("/products", creatNewPoduct);

//ruta para borrar productos
router.delete("/products");

//ruta para editar productos
router.put("/products");

//ruta para tener un producto por id
router.get("/products");

export default router;
