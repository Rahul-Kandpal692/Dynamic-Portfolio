import express from "express"

import { isAuthenticated } from "../middlewares/auth.js";

import { addSkill, deleteSkill, getAllSkills, updateSkill } from "../controller/skillController.js";

const router = express.Router();

router.post("/add",isAuthenticated,addSkill);
router.delete("/delete/:id",isAuthenticated,deleteSkill);
router.put("/update/:id",isAuthenticated,updateSkill);
router.get("/getall",getAllSkills);

export default router