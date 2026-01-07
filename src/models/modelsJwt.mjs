import { connection } from "../functions/connectionDB.mjs";

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