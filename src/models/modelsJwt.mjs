import mysql from 'mysql2/promise';
import {config} from 'dotenv'
config()
const connection = await mysql.createConnection({
    host: `${process.env.host}`,
    user: `${process.env.user}`,
    password: `${process.env.password}`,
    database: `${process.env.DB}`
})

await connection.connect((err) =>{ 
    if(err){
        console.error(err)
    }else{
        console.log('Connected');
    }
})


export const getUser = async(info={}) =>{
    let queryD = [];
    if(info.username){
        for(let key in info){
            queryD.push(`${key}=?`)
        }
    }
    const query = `SELECT * FROM users WHERE ${queryD.join(' AND ')}`;
    const [user] = await connection.query(query, [info.username, info.password])
    //console.log(user)
    return(user)
}   