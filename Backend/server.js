import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";

// routes
import userRoutes from "./routes/user.route.js";
import complaintRoutes from "./routes/complaint.route.js";

dotenv.config();

const app = express();

/* =====================
   DATABASE CONNECTION
===================== */
connectDB();

/* =====================
   MIDDLEWARES
===================== */
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

/* =====================
   ROUTES
===================== */
app.use("/api/users", userRoutes);
app.use("/api/complaints", complaintRoutes);

/* =====================
   TEST ROUTE
===================== */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend running on Vercel",
  });
});

/* =====================
   EXPORT APP (NO listen)
===================== */
export default app;
