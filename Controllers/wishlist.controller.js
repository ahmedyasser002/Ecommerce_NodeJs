import wishlistModel from "../Models/WishList.js";

let addToWishlist = async (req, res) => {
    const userId = req.user._id;
    const productId = req.body.product_id;
    let wishlist = await wishlistModel.findOne({ user_id: userId });
    if (!wishlist) {
      wishlist = await wishlistModel.create({
        user_id: userId,
        product_id: productId
      });
      return res.status(201).json({
        message: "Wishlist created and products added",data: wishlist
      });
    }
    wishlist = await wishlistModel.findOneAndUpdate(
      { user_id: userId },{ $addToSet: { product_id: productId } }, { new: true }
    );

    res.status(200).json({
      message: "Products added to wishlist",
      data: wishlist
    });

};



let deleteFromWishlist = async (req, res) => {
  let productId = req.params.product_id;
  let user_id = req.user._id;

  let wishlist = await wishlistModel.findOne({ user_id: user_id });

  if (!wishlist) {
    return res.status(400).json({
      message: "There is no wishlist for this user"
    });
  }

  wishlist = await wishlistModel.findOneAndUpdate(
    { user_id: user_id },
    { $pull: { product_id: productId } },
    { new: true }
  );

  res.status(200).json({
    message: "Product removed from wishlist",
    data: wishlist
  });
};

let getMyWishlist = async (req,res)=>{
    const userId = req.user._id;
    let wishlist = await wishlistModel.findOne({ user_id: userId });
   if (!wishlist) {
    return res.status(400).json({
      message: "There is no wishlist for this user"
    });
  }
     return res.status(200).json({
        message: "This is your wishlist",data: wishlist
      });
  
}

let clearMyWishlist = async(req,res)=>{
    const userId = req.user._id;
    let wishlist = await wishlistModel.findOne({ user_id: userId });
   if (!wishlist) {
    return res.status(400).json({
      message: "There is no wishlist for this user"
    });
  }
   wishlist = await wishlistModel.findOneAndUpdate(
      { user_id: userId }, { product_id: []  }, { new: true }
    );

    res.status(200).json({
      message: "wishlist cleared ",
      data: wishlist
    });


}



export {addToWishlist , deleteFromWishlist , getMyWishlist, clearMyWishlist}