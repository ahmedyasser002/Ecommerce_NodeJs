import asyncHandler from "../Middlewares/asyncHandler.js";
import { couponModel } from "../Models/Coupon.js";
import { userModel } from "../Models/User.js";
import { sendPromotionEmail } from "../NewsletterEmail/promotionEmail.js";



const sendPromotion = asyncHandler(async (req,res) => {
    const {id} = req.body

    let coupon = await couponModel.findById(id)
    if (!coupon) return res.status(404).json({ message: "Coupon not found" })

    let allUsers = await userModel.find()
    if (!allUsers.length) return res.status(404).json({ message: "No users found" })

    for (const user of allUsers){
        await sendPromotionEmail(user.email, coupon)
    }

    res.status(200).json({ message: "Promotion emails sent successfully" }) 

})

export default sendPromotion