import express from "express";
import morgan from "morgan";
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import { router as routesInfo } from "./routes/routers.mjs";
import { expressjwt } from "express-jwt";
import { router as jwtRouter } from "./routes/jwt.mjs";
import cors from 'cors';
import { router as registerRouter } from "./routes/register.mjs";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(dirname(fileURLToPath(import.meta.url))));

app.use('/login', jwtRouter)
app.use('/register', registerRouter)

app.use('/v16/store',expressjwt({secret: 'secret', algorithms: ["HS256"]}), routesInfo)

app.get('/', (request, response) =>{
    response.redirect('/v16/store')
});

app.use((err, request, response, next) =>{
    if(err.name === 'UnauthorizedError'){
        response.status(401).json("Unauthorized")
    }else{
        next();
    }
})

app.listen(8080, () =>{
    console.log('Listening to the http://localhost:8080');
})