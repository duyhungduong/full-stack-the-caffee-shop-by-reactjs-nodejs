const tableModel = require("../../models/tableModel");

const getTypeWiseTable = async(req, res) =>{
    try {
        const {tableType} = req?.body || req?.query
        const table = await tableModel.find({tableType})

        res.json({
            data: table,
            message: "Table found successfully",
            success: true,
            error:false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
          });
    }
}

module.exports = getTypeWiseTable