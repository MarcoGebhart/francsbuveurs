import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { router } from "./app/routes/router.js";


const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
	origin: "http://localhost:5000", // ou ton domaine en prod
	credentials: true // autorise l'envoi de cookies
  }));

app.use(express.json());
// Parser les cookies dans les requêtes entrantes, permet d'acceder à req.cookies 
app.use(cookieParser());
app.get("/", (req, res) => {
	res.send("Hello world! Welcome to the francsbuveurs API!");
});
app.use(router);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});