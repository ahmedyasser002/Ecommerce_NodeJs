export const promotionTemplate = (coupon) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1>Special Offer Just For You! 🎉</h1>
      <p>Use code <strong>${coupon.code}</strong> to get 
        ${coupon.discountType === 'fixed' 
          ? `$${coupon.discountValue} off` 
          : `${coupon.discountValue}% off`}
      </p>
      <p>Minimum order: $${coupon.minOrderAmount}</p>
      <p>Hurry! Offer expires on ${new Date(coupon.expiresAt).toDateString()}</p>
    </div>
  `
}