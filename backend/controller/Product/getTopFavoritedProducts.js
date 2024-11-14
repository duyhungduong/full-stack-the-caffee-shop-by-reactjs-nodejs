const addToFavoriteModel = require("../../models/favoriteProduct");
const productModel = require("../../models/productModel");

const getTopFavoritedProducts = async (req, res) => {
  try {
    const topFavoritedProducts = await addToFavoriteModel.aggregate([
      {
        $group: {
          _id: "$productId",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } }, // Sắp xếp theo lượt yêu thích giảm dần
      { $limit: 10 }, // Lấy 10 sản phẩm
    ]);

    // Sử dụng Promise.all để đợi tất cả các truy vấn findById hoàn thành
    const result = await Promise.all(
      topFavoritedProducts.map(async (favorite) => {
        const product = await productModel.findById(favorite._id);
        return {
          productDetails: product,
          favoritesCount: favorite.count,
        };
      })
    );

    // Trả về phản hồi
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        data: result,
        error: false,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Không có sản phẩm nào trong danh sách yêu thích",
        error: true,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Có lỗi xảy ra khi truy xuất sản phẩm yêu thích",
      error: true,
      success: false,
    });
  }
};

module.exports = getTopFavoritedProducts;
