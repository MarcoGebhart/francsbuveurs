import "dotenv/config";
import express from "express";
import { router } from "./app/routes/router.js";


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello world! Welcome to the francsbuveurs API!");
});
app.use(router);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});