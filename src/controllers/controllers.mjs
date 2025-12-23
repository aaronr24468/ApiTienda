import { addI, cartProducts, deleteI, deleteP, editP, getA, getCart, getCate, getP, insertI, profileP, registerU, searchI, sliderI, updateCart } from "../models/models.mjs";



export const getAll = async(request, response) =>{
    try {
        const data = await getA();
        data.forEach((element) =>{
            let imagesSplit = element.images.split(' ')
            element.images = imagesSplit
        })
        response.status(200).json(data)
    } catch (e) {
        console.error(e);
        response.status(401).json("F")
    }
}

export const searchItem = async(request, response) =>{
    try {
        const nameItem = request.params.item;
        const data = await searchI()
        const filtrado = data.filter((element) =>{
            let imagesSplit = element.images.split(' ')
            element.images = imagesSplit
            return(element.name.toLowerCase().includes(nameItem.toLowerCase()))
        })
        response.status(200).json(filtrado)
    } catch (e) {
        console.error(e);
        response.status(401).json("F")
    }
}

export const getProduct = async(request, response) =>{
    try {
        const id = Number(request.params.id);
        const product = await getP(id)
        const arrPhotos = product[0].images.split(' ');
        product[0].images = arrPhotos
        response.status(200).json(product)
    } catch (e) {
        console.error(e);
        response.status(401).json("F")
    }
}

export const editProduct = async(request, response) =>{
    try {
        const productDetails = {
            id: Number(request.params.id),
            name: request.body.name,
            description: request.body.description,
            fabricant: request.body.fabricant,
            model: request.body.model,
            color: request.body.color,
            weight: request.body.weight,
            price: request.body.price,
            images: '',
            videos: '',
            sliderID: 0,
            category: request.body.category,
        }
        //console.log(productDetails)
        const data = await editP(productDetails);
        response.status(200).json(data)
    } catch (e) {
        console.error(e);
        response.status(401).json("F")
    }
}

export const deleteProduct = async(request, response) =>{
    try {
        const id = Number(request.params.id);
        await deleteP(id)
        response.status(200).json('S')
    } catch (e) {
        console.error(e);
        response.status(401).json("F")
    }
}

export const insertImage = async(request, response) =>{
    try {
        const info = request.files
        let photos = []
        let data = {
            id: request.params.id,
            url: []
        }
        for(let value of info){
            photos.push(`http://localhost:8080/content/photos/${value.filename}`)
        }
        data.url.push(photos.join(' '))
        console.log(info)
        //console.log(data)
        await insertI(data);
        response.status(200).json("S")
    } catch (e) {
        console.error(e);
        response.status(401).json('F')
    }
}

export const addImage = async(request, response) =>{
    try {
        let photos = []
        const info = {
            id: request.params.id,
            url: []
        }
        request.files.forEach((element) =>{
            info.url.push(`http://localhost:8080/content/photos/${element.filename}`)
        });
        await addI(info)
        response.status(200).send('S')
    } catch (e) {
        console.error(e);
        response.status(401).json('F')
    }
}

export const deleteImage = async(request, response) =>{
    try {
        let data = []
        data.push(Number(request.params.id), Number(request.params.idImage));
        console.log(data)
        await deleteI(data``)
        response.status(401).json('S');
    } catch (e) {
        console.error(e);
        response.status(401).json('F')
    }
}

export const registerUser = async(request, response) =>{
    try {
        let userData = {
            name: request.body.name,
            lastname: request.body.lastname,
            day: Number(request.body.day),
            month: Number(request.body.month),
            year: request.body.year,
            username: request.body.username,
            password: request.body.password,
            image: '',
            videos: '',
            cart: ''
        }
        console.log(userData)
        await registerU(userData)
        response.status(200).json("S")
    } catch (e) {
        console.error(e);
        response.status(401).json("F")
    }
}

export const sliderItems = async(request, response) =>{
    try {
        const items = await sliderI();
        items.forEach((element) =>{
            const arrayI = element.images.split(' ')
            element.images = arrayI
        })
        response.status(200).json(items)
    } catch (e) {
        console.error(e)
        response.status(401).json("F")
    }
}

export const profilePhoto = async(request, response) =>{
    try {
        const data = {
            id: request.params.id,
            url: `http://localhost:8080/content/userPhoto/${request.file.filename}`
        }
        await profileP(data);
        response.status(200).json('S')
    } catch (e) {
        console.error(e);
        response.status(401).json("F")
    }
}

export const getUserPhoto = (request, response) =>{
    try {
        const photo = [
            {
                profilePhoto: request.auth[0].image,
                user: request.auth[0]
            }
        ];
        response.status(200).json(photo)
    } catch (e) {
        console.error(e);
        response.status(401).json("F")
    }
}

export const getCategory = async(request, response) =>{
    try {
        const category = request.params.category;
        const data = getCate(category)
        response.status(200).json(data)
    } catch (e) {
        console.error(e);
        response.status(401).json('F')
    }
}

export const addCart = async(request, response) =>{
    try {
        const id = request.body.idUser;
        const idProduct = request.body.idProduct;
        const cart = await getCart(id)
        if(cart[0].cart === ""){
            cart[0].cart = idProduct
            updateCart(cart[0].cart, id)
            //console.log("entro")
        }else{
            const arrCart = cart[0].cart.concat(" "+idProduct);
            updateCart(arrCart, id)
            //console.log("entro 2")
        }
        response.status(200).json('S')
    } catch (e) {
        console.error(e);
        response.status(401).json("F") 
    }
}

export const getItemsCart = async(request, response) =>{
    try {
        const id = request.body.idUser;
        const cart = await getCart(id)
        const arrCart = cart[0].cart.split(" ")
        const data = await cartProducts(arrCart)
        data.forEach((element) =>{
            const arrImages = element.images.split(' ');
            element.images = arrImages
        })
        response.status(200).json(data)
    } catch (e) {
        console.error(e);
        response.status(401).json("F");
    }
}

export const deleteCartList = async(request, response) =>{
    try {
        const data = {
            id: request.body.idUser,
            indexItem: request.body.indexItem
        }
        const cart = await getCart(data.id)
        //console.log(cart)
        const splitCart = cart[0].cart.split(' ')

        const filterData = splitCart.filter((element) =>{ //filtramos para quitar el item del carrito, le decimos que nos de todo lo que sea diferente al index del item que queremos quitar
            return(element != data.indexItem)
        })
        
        await updateCart(filterData.join(' '), data.id) //convertimos el arr de filterData en un texto y actualizamos el carrito con updateCart
        response.status(200).json('S')
    } catch (e) {
        console.error(e);
        response.status(401).json("F");
    }
}