// Import required modules
import express from "express";
import {
  loginAdmin,
  getAdmin,
  logoutAdmin,
  getBabies,
  addBaby,
  getBaby,
  deleteBaby,
  getHistories,
} from "../controllers/adminControllers.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

// Create a router instance
const router = express.Router();

// Define routes for admin operations

router.post("/admin-login", loginAdmin);
router.get("/getadmin", isAdminAuthenticated, getAdmin);
router.get("/admin-logout", logoutAdmin);
router.get("/getbabies", isAdminAuthenticated, getBabies);
router.post("/addbaby", isAdminAuthenticated, addBaby);
router.get("/getbaby/:id", isAdminAuthenticated, getBaby);
router.delete("/deletebaby/:id", isAdminAuthenticated, deleteBaby);
router.get("/gethistories", isAdminAuthenticated, getHistories);

// Export the router to be used in other modules
export default router;
