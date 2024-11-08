const bookingTablbeModel = require("../../models/bookingTable")
const orderModel = require("../../models/orderProductModel")
const userModel = require("../../models/userModel")

const allBookingController = async(request,response)=>{
    const userId = request.userId

    const user = await userModel.findById(userId)

    if(user.role !== 'ADMIN'){
        return response.status(500).json({
            message : "not access"
        })
    }

    const AllOrder = await bookingTablbeModel.find().populate("tableId").populate("userId").sort({ createdAt : -1 })

    return response.status(200).json({
        data : AllOrder,
        success : true
    })

}

module.exports = allBookingController