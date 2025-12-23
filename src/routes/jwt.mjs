import jwt from 'jsonwebtoken';

import { Router } from 'express';
import { getUser } from '../models/modelsJwt.mjs';

export const router = Router();

router.post('/', async(request, response) =>{
    try {
        const username = request.body.username;
        const password = request.body.password;
        const user = await getUser({username, password})
        console.log(user.length)
        if(user.length > 0){
            const payload = {...user};
            delete payload.password;
            const token = jwt.sign(payload, 'secret');
            response.status(200).send({token}) 
        }else{
            response.status(401).json('unauthorized')
        }
    } catch (e) {
        console.error(e);
        response.status(401).json('unauthorized')
    }
})
