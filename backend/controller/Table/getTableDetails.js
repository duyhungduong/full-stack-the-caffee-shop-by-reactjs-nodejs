
const tableModel = require("../../models/tableModel");

const getTableDetails = async(req, res) =>{
    try {
        const {productId} = req.body

        const product = await tableModel.findById(productId)

        res.json({
            data: product,
            message: "Product details fetched successfully!! OK",
            success: true,
            error: false,
        })
    } catch (err) {
        res.status(400).json({
            message: err?.message || err,
            error: true,
            success: false,
          });
    }
}

module.exports = getTableDetails