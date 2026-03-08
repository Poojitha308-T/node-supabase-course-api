import express from "express";
import dotenv from "dotenv";
import { logger } from './middleware/logger.js';
import courseRoutes from "./routes/courses.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(logger);

app.use("/", courseRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})