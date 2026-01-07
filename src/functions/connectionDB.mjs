import mysql from 'mysql2/promise';
import {config} from 'dotenv';
config();

export const connection = mysql.createPool({
    host: `${process.env.host}`,
    user: `${process.env.user}`,
    password: `${process.env.password}`,
    database: `${process.env.DB}`,

     waitForConnections: true,
     connectionLimit: 5,
     queueLimit: 0,
     connectTimeout: 10000
})