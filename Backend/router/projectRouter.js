import express from "express"

import { isAuthenticated } from "../middlewares/auth.js";

import { addProject, updateProject, deleteProject, getAllProjects, getSingleProject} from "../controller/projectController.js";

const router = express.Router();

router.post("/add",isAuthenticated,addProject);
router.delete("/delete/:id", isAuthenticated, deleteProject);
router.put("/update/:id",isAuthenticated,updateProject);
router.get("/getall", getAllProjects);
router.get("/get/:id", getSingleProject);

export default router