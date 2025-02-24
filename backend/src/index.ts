import express from "express";
import { Request, Response } from "express-serve-static-core";
import storeRoutes from "./routes/inventory";

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Hello Welcome To The Manga Inventory Server!" });
});

app.use("/inventory", storeRoutes);

// start the server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
