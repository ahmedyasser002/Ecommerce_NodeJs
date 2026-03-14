import transporter from "../Config/nodemailer.js"
import { promotionTemplate } from "./promotionTemplate.js"

export const sendPromotionEmail = async (userEmail, coupon) => {
  await transporter.sendMail({
    from: `"Ecommerce App" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "🎉 Special Offer Just For You!",
    html: promotionTemplate(coupon)
  })
}