const orderModel = require("../../models/orderProductModel")

const countOrderProduct = async(req,res)=>{
    try{
        const userId = req.userId

        const count = await orderModel.countDocuments({
            userId : userId
        })

        res.json({
            data : {
                count : count
            },
            message : "Count of products in order!!!",
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

module.exports = countOrderProduct