import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MYGGsrn98',
    database: 'tienda16'
});

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