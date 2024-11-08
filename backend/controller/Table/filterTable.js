const tableModel = require("../../models/tableModel")

const filterTableController = async(req,res)=>{
 try{
        const tableTypeList = req?.body?.category || []

        const product = await tableModel.find({
            tableType :  {
                "$in" : tableTypeList
            }
        })

        res.json({
            data : product,
            message : "product",
            error : false,
            success : true
        })
 }catch(err){
    res.json({
        message : err.message || err,
        error : true,
        success : false
    })
 }
}


module.exports = filterTableController