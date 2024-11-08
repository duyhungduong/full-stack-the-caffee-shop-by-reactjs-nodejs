const bookingTablbeModel = require("../../models/bookingTable")

const countBookingTable = async(req,res)=>{
    try{
        const userId = req.userId

        const count = await bookingTablbeModel.countDocuments({
            userId : userId
        })

        res.json({
            data : {
                count : count
            },
            message : "Count of table in your booking!!!",
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

module.exports = countBookingTable