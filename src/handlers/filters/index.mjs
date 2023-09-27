import { Router } from "express";
import applyFiltersHandler from "./applyFiltersHandler.mjs"
import multer from "multer";
const router = Router();


const upload = multer({storage})
router.get("/", (req, res) => {
  res.send("OK images GET");
})

router.post("/", applyFiltersHandler);

export const test = () => {

}

export default router;