import reviewModel from "../Models/Review.js"

let list_user_reviews = async (req,res)=>{
    let reviews = await reviewModel.find().populate("createdBy" , "name").populate("product_id" , "name") ;
    if(reviews.length === 0){
       return res.json({message : "no reviews found for this user"})
    }
    res.status(200).json({reviews}) ;
}

let createReview = async(req,res)=>{
    req.body.createdBy = req.user._id ;
    let review =await reviewModel.create(req.body);
    res.status(201).json({
        message:"New review added",
        data:review
    });}

let deleteReview = async(req,res)=>{
    let id = req.params.id ;
    let deletedReview = await reviewModel.findByIdAndDelete({
        _id:id ,
        createdBy:req.user._id
    });
    if(!deletedReview){
        return res.status(404).json({message:"review not found"});
    }

    res.json({message:"Review deleted"});
}

let updateReview = async (req, res) => {

    let id = req.params.id;

    let review = await reviewModel.findById(id);

    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    if (review.createdBy.equals(req.user._id)) {

        let updatedReview = await reviewModel.findByIdAndUpdate(id,req.body,{ new: true });

        return res.json({ message: "Review updated",data: updatedReview});
    }

    return res.status(403).json({message: "You cannot update this review"});
};

export {list_user_reviews,createReview , updateReview ,deleteReview}