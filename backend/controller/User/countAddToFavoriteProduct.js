const addToFavoriteModel = require("../../models/favoriteProduct")

const countAddToFavoriteProduct = async(req,res) =>{
    try{
        const userId = req.userId

        const count = await addToFavoriteModel.countDocuments({
            userId : userId
        })

        res.json({
            data : {
                count : count
            },
            message : "Count of products in Favorite!!!",
            error : false,
            success : true
        })
    }catch(error){
        res.json({
            message : error.message || error,
            error : false,
            success : false,
        })
    }
}

module.exports = countAddToFavoriteProduct