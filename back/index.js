import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { router } from "./app/routes/router.js";
import { handleOrderCreated } from "./webhooks/order.js";


const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
	origin:["http://localhost:3000", "http://192.168.1.186:3000"], // ou ton domaine en prod
	credentials: true // autorise l'envoi de cookies
  }));

app.use(express.json());
app.post("/webhook/orders/create", async (req, res) => {
	const order = req.body;
	await handleOrderCreated(order);
	res.status(200).send("OK");
  });
// Parser les cookies dans les requêtes entrantes, permet d'acceder à req.cookies 
app.use(cookieParser());
app.get("/", (req, res) => {
	res.send("Hello world! Welcome to the francsbuveurs API!");
});
app.use(router);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});