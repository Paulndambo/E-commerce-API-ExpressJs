const Product = require("../models/product")

const products = [
    {
        "name": "Microsoft Surface",
        "price": 145000,
        "manufacturer": "Microsoft Inc.",
        "discount": 7,
        "quantity": 19
    },
    {
        "name": "Mac Mini",
        "price": 65000,
        "manufacturer": "Apple Inc.",
        "discount": 13,
        "quantity": 130
    },
    {
        "name": "Ugali Floor - 2kg",
        "price": 170,
        "manufacturer": "Uga Group LTD",
        "discount": 0,
        "quantity": 500
    },
    {
        "name": "Ajab Chapati Uga - 1kg",
        "price": 220,
        "manufacturer": "Ajab LTD",
        "discount": 5,
        "quantity": 350
    }
]


const getAllProducts = async(req, res) => {
    const productsList = await Product.find({})
    console.log(productsList)
    res.status(200).send({"count": products.length, "products": productsList})
}


const getSingleProduct = async(req, res, next) => {
    const { id } = req.params

    let product = await Product.findOne({_id: id})

    if(!product) {
        return res.status(404).send({"message": `No product with id: ${id} found`})
    }

    console.log(product)

    res.status(200).send({"product": product})
}

const createNewProduct = async(req, res, next) => {
    const data = req.body
    const product = await Product.create(data)
    res.status(201).send({"product": product})
}

const createManyProducts = async(req, res) => {
    const productsData = req.body
    const products = await Product.insertMany(productsData)
    res.status(201).send({"products": products})
}


const updateProduct = async(req, res, next) => {
    const { id } = req.params
    const productData = req.body
    
    const product = await Product.findByIdAndUpdate({_id: id}, productData, {
        new: true,
        runValidators: true
    })
    
    if(!product) {
        return res.status(404).send({"message": `Product with ID: ${id} not found`})
    }

    /*
    const updatedProducts = products.map(product => {
        if (product.id === productId) {
            return {
                ...product, 
                name: name,
                discount: discount,
                price: price,
                quantity: quantity
            }
        }
        return product;
    })
    */

    res.status(201).send({"product": product})
}

const deleteProduct = async(req, res, next) => {
    const { id } = req.params
    const product = await Product.findByIdAndDelete({_id: id})

    if(!product) {
        return res.status(404).send({"message": `You are trying to delete a product that does not exist`})
    }

    return res.status(204).send({"message": `Product with id: ${id} deleted successfully!`})
}



module.exports = {
    getAllProducts,
    createNewProduct,
    getSingleProduct,
    updateProduct,
    createManyProducts,
    deleteProduct
}