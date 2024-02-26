import express from "express";
import {
  addMedicine,
  getAllMedicines,
  getMedicines,
  getMedicineById,
  updateMedicine,
} from "../controllers/medicineControllers.js";
import multer from "multer";
import { checkToken } from "../controllers/authController.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const router = express.Router();

router.route("/")
      .post(checkToken, upload.single("file"), addMedicine)
      .get(getAllMedicines);

router.route("/:letter")
      .get(getMedicines);

router.route("/details/:id")
      .get(getMedicineById)
      .patch(checkToken, upload.single("file"), updateMedicine);
