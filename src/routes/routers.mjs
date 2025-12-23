import { Router } from "express";
import { addCart, addImage, deleteCartList, deleteImage, deleteProduct, editProduct, getAll, getCategory, getItemsCart, getProduct, getUserPhoto, insertImage, profilePhoto, searchItem, sliderItems } from "../controllers/controllers.mjs";
import multer from "multer";
import {dirname, join,} from 'path';
import { fileURLToPath } from "url";



const diskStorageP = multer.diskStorage({
    destination: join(dirname(fileURLToPath(import.meta.url)), '../content/photos'),
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
})

const diskStorageVideo = multer.diskStorage({
    destination: join(dirname(fileURLToPath(import.meta.url)), '../content/videos'),
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
})

const diskStorageProfile = multer.diskStorage({
    destination: join(dirname(fileURLToPath(import.meta.url)), '../content/userPhoto'),
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }
})

const getProductImages = multer({
    storage: diskStorageP
}).array('image')

const getProductVideos = multer({
    storage: diskStorageVideo
}).single('video')

const getProfilePhoto = multer({
    storage: diskStorageProfile
}).single('image')

export const router = Router(); 


router.get('/', getAll);

router.post("/search/:item", searchItem)

router.get('/sliderItems', sliderItems)

router.get('/product/:id', getProduct);

router.post('/edit/:id', editProduct);

router.put('/new/product', editProduct);

router.delete('/delete/:id', deleteProduct);

router.post('/uplodImage/:id', getProductImages, insertImage);

router.post('/addImage/:id',getProductImages, addImage);

router.delete('/deleteImage/:id/:idImage', deleteImage);

router.post('/profile/photo/:id', getProfilePhoto, profilePhoto);

router.get('/getUser/photo', getUserPhoto);

router.get('/Category/:category', getCategory);

router.post('/addCart', addCart);

router.post('/getCart', getItemsCart);

router.post('/deleteCartList', deleteCartList)

