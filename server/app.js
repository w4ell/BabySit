import express from "express";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import bcrypt from "bcryptjs";

// import routes
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
// It's for ErrorHandling
app.use(ErrorMiddleware);

app.use("/test", (req, res) => {
  res.send("Server is working fine");
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenvConfig({
    path: "config/.env",
  });
}

app.use("/api/admin", adminRoutes);
//get admin password for manual setup
//console.log(await bcrypt.hash("123456", 10));

export default app;
