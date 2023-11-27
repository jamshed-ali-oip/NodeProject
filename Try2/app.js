import express from "express";
import PORT from "./config.js";
import authRoutes from "./routes/auth/index.js"
import connecttoDb from "./db.js";
const app = express();

connecttoDb()

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

