import express from "express"
import { deleteMessge, getMessages, sendMessage } from "../controller/messageController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send",sendMessage);
router.get("/getall",getMessages);
router.delete("/delete/:id",isAuthenticated,deleteMessge);

export default router