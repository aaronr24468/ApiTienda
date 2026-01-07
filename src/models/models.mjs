import mysql from 'mysql2/promise';
import {config} from 'dotenv'
config()
const connection = await mysql.createConnection({
    host: `${process.env.host}`,
    user: `${process.env.user}`,
    password: `${process.env.password}`,
    database: `${process.env.DB}`
})


export const getA = async() =>{
    const query = 'SELECT * FROM products';
    const [data] = await connection.query(query);
    return(data)
}

export const searchI = async() =>{
    const query = 'SELECT * FROM products';
    const [data] = await connection.query(query);
    return(data)
}

export const getP = async(id) =>{
    const query = 'SELECT * FROM products WHERE id=?';
    const [product] = await connection.query(query, [id])
    return(product)
}

export const editP = async(productDetails) =>{
    if(productDetails.id){
        const query = 'UPDATE products set name=?, description=?, fabricant=?, model=?, color=?, weight=?, price=?, sliderID=?, category=? WHERE id=?';
        await connection.query(query, [productDetails.name, productDetails.description, productDetails.fabricant, productDetails.model, productDetails.color, productDetails.weight, productDetails.price,productDetails.sliderID,productDetails.category, productDetails.id,])
        return("S")
    }else{
        const query = 'INSERT INTO products(name, description, fabricant, model, color, weight, price, images, videos, sliderID, category) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
        await connection.query(query, [productDetails.name, productDetails.description, productDetails.fabricant, productDetails.model, productDetails.color, productDetails.weight, productDetails.price, productDetails.images, productDetails.videos,productDetails.sliderID,productDetails.category])
        const queryIndex = 'SELECT * FROM products';
        const [data] = await connection.query(queryIndex)
        const maxId = Math.max(...data.map((element) =>element.id))
        return(maxId)
    }
}

export const deleteP = async(id) =>{
    const query = 'DELETE FROM products WHERE id=?';
    await connection.query(query,[id])
}

export const insertI = async(data) =>{
    const query = 'UPDATE products SET images=? WHERE id=?';
    await connection.query(query, [data.url, data.id])
}

export const addI = async(info) =>{
    const query = 'SELECT * FROM products WHERE id=?';
    const [data] = await connection.query(query, [info.id])
    const imagesArr = data[0].images.split(' ');
    if(imagesArr[0] === ""){
        imagesArr.shift();
    }
    info.url.forEach((element) =>{
        imagesArr.push(element)
    })
    const imagesTxt = imagesArr.join(' ')
    const query2 = 'UPDATE products SET images=? WHERE id=?';
    await connection.query(query2, [imagesTxt, info.id])
}

export const deleteI = async(data) =>{
    const query = 'SELECT * FROM products WHERE id=?';
    const [bd] = await connection.query(query,[data[0]]);
    const imagesBd = bd[0].images.split(' ');
    imagesBd.splice(data[1],1)
    const imagesToText = imagesBd.join(' ')
    const queryUpdate = 'UPDATE products SET images=? WHERE id=?';
    await connection.query(queryUpdate, [imagesToText,data[0]] )
}


export const registerU = async(userData) =>{
    const query = 'INSERT INTO users(name, lastname, day, month, year,username, password, image, cart) values(?,?,?,?,?,?,?,?,?)';
    await connection.query(query,[userData.name, userData.lastname, userData.day, userData.month, userData.year, userData.username, userData.password, userData.image, userData.cart])
}

export const sliderI = async() =>{
    const query = 'SELECT * FROM products WHERE sliderID=1';
    const [data] = await connection.query(query)
    return(data)
}

export const profileP = async(data) =>{
    const query = 'UPDATE users SET image=? WHERE id=?';
    await connection.query(query, [data.url,data.id]);
}

export const getCate = async(category) =>{
    const query = 'SELECT * FROM products WHERE category=?';
    const [data] = await connection.query(query, [category]);
    return(data)
}

export const getCart = async(id) =>{
    const query = 'SELECT * FROM users WHERE id=?';
    const [cart] = await connection.query(query, [id]);
    return(cart)
}

export const updateCart = async(cart,id) =>{
    const query = `UPDATE users SET cart=? WHERE id=?`;
    await connection.query(query, [cart, id])
}

export const cartProducts = async(items) =>{
    const queryD = [];
    for(let data of items){
        queryD.push(`?`)
    }
    console.log(items)
    const query = `SELECT * FROM products WHERE id IN(${queryD.join(',')})`;
    const [data] = await connection.query(query, [...items.map((data) => Number(data))])
    return(data)
}