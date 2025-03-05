import express from "express";
import { Request, Response } from "express-serve-static-core";
import storeRoutes from "./routes/inventory";
import filterRoutes from "./routes/filter";
import { errorHandler } from "./handlers/error";

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Hello Welcome To The Manga Inventory Server!" });
});

// REST API routes
app.use("/inventory", storeRoutes);
// FILTERS routes
app.use("/filter", filterRoutes);

// error handling middleware
app.use(errorHandler);

// start the server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
