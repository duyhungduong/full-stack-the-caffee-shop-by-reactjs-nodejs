const productModel = require("../../models/productModel")

const searchProduct = async(req,res)=>{
    try{
        const query = req.query.q 
        // console.log("backend querry",query)

        const regex = new RegExp(query,'i','g')
        const products = await productModel.find({
            $or: [
                {productName: regex},
                {category: regex},
            ]
        })

        res.json({
            data  : products ,
            message : "product found",
            error : false,
            success : true
        })

    } catch (err) {
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = searchProduct