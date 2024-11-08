
const addToFavoriteModel = require("../../models/favoriteProduct")

const deleteAddToFavoriteProduct = async(req,res)=>{
    try{
        const currentUserId = req.userId 
        const addToCartProductId = req.body._id

        const deleteProduct = await addToFavoriteModel.deleteOne({ _id : addToCartProductId})

        res.json({
            message : "Product deleted from favorite successfully",
            error : false,
            success : true,
            data : deleteProduct
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = deleteAddToFavoriteProduct