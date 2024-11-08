const addToFavoriteModel = require("../../models/favoriteProduct")

const addToFavoriteController = async(req, res) =>{
    try {
        const { productId } = req?.body
        const currentUser = req.userId

        const isProductAvailable = await addToFavoriteModel.findOne({ productId , userId: currentUser })

        // console.log("isProductAvailable ", isProductAvailable)

        if(isProductAvailable){
            return res.json({
                message: "Product is already in your favorite",
                success: false,
                error: true,
            })
        }

        const payload = {
            productId:  productId,
            userId: currentUser,
        }

        const newAddToCart = new addToFavoriteModel(payload)
        const saveProduct = await newAddToCart.save()

        return res.json({
            data: saveProduct,
            message: "Product added to favorite successfully",
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

module.exports = addToFavoriteController