import express from "express";
import { create, findAll, findOne, update, deleteOne, addComment } from "../controllers/childrenControllers.js";

const router = express.Router();

router.post("/", create);
router.get("/", findAll);
router.get("/:id", findOne);
router.put("/:id", update);
router.delete("/:id",deleteOne);
router.post('/children/:id/comments',addComment);


export default router;  
