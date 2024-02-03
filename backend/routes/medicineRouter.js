import express from 'express'
import { addMedicine, getAllMedicines } from '../controllers/medicineControllers.js'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer( { storage: storage } )

export const router = express.Router()

router.route('/')
      .post(upload.single('file'), addMedicine)
      .get(getAllMedicines)