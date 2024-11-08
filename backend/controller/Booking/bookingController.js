const bookingTablbeModel = require("../../models/bookingTable")

const bookingController = async(request,response)=>{
    try {
        const currentUserId = request.userId

        const bookingList = await bookingTablbeModel.find({ userId : currentUserId }).populate("tableId").sort({ createdAt : -1 })

        response.json({
            data : bookingList,
            message : "booking list",
            success : true
        })

    } catch (error) {
        response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = bookingController