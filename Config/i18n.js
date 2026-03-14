import i18next from "i18next"
import middleware from "i18next-http-middleware"

i18next.use(middleware.LanguageDetector).init({
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        coupon_not_found: "coupon doesn't exist",
        coupon_inactive: "Coupon is not active",
        coupon_expired: "Coupon has expired",
        coupon_max_uses: "Coupon reached its maximum uses",
        coupon_low_cart: "Cart total is too low for this coupon",
        coupon_applied: "Coupon applied successfully",
      }
    },
    ar: {
      translation: {
        coupon_not_found: "الكوبون غير موجود",
        coupon_inactive: "الكوبون غير مفعل",
        coupon_expired: "الكوبون منتهي الصلاحية",
        coupon_max_uses: "الكوبون وصل للحد الأقصى من الاستخدام",
        coupon_low_cart: "إجمالي السلة أقل من الحد المطلوب",
        coupon_applied: "تم تطبيق الكوبون بنجاح",
      }
    }
  }
})

export default i18next