const addToCartModel = require("../../models/cartProduct")

const addToCartController = async(req, res) =>{
    try {
        const { productId } = req?.body
        const currentUser = req.userId

        const isProductAvailable = await addToCartModel.findOne({ productId , userId: currentUser })

        // console.log("isProductAvailable ", isProductAvailable)

        if(isProductAvailable){
            return res.json({
                message: "Product is already in your cart",
                success: false,
                error: true,
            })
        }

        const payload = {
            productId:  productId,
            userId: currentUser,
            quantity: 1,
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        return res.json({
            data: saveProduct,
            message: "Product added to cart successfully",
            success: true,
            error: false,
           
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
          });
    }
}

module.exports = addToCartController