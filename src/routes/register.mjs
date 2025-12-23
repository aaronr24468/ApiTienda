import { Router } from "express";
import { registerUser } from "../controllers/controllers.mjs";
import multer from "multer";
import {dirname, join} from 'path'
import { fileURLToPath } from "url";

const diskStorageUser = multer.diskStorage({
    destination: join(dirname(fileURLToPath(import.meta.url)), '../content/userPhotos'),
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
})

const uploadProfilePhoto = multer({
    storage: diskStorageUser
}).single('image')

export const router = Router();

router.post('/', registerUser)

router.post('/upload/:id',uploadProfilePhoto, (request, response) =>{
    console.log(request.params.id)
})