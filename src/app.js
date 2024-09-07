import express from "express";
import config from "./config.js";

import productsRoutes from "./routes/products.routes.js";

const app = express();

//settings (para configurar el puerto)
app.set("port", config.port);

//configurar el servidor para aceptar datos en json
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(productsRoutes);

export default app;
