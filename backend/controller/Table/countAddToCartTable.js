const addToCartModel = require("../../models/cartProduct")
const addToCartTableModel = require("../../models/cartTable")

const countAddToCartTable = async(req,res)=>{
    try{
        const userId = req.userId

        const count = await addToCartTableModel.countDocuments({
            userId : userId
        })

        res.json({
            data : {
                count : count
            },
            message :  "Count of products in cart!!!",
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

module.exports = countAddToCartTable