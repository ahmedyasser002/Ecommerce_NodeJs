import express from 'express'
import { isauthenticated } from '../Middlewares/authenticationMiddleware.js'
import { authorizationMiddleware } from '../Middlewares/autorizationMiddleware.js'
import { ROLES } from '../Constants/roles.js'
import sendPromotion from '../Controllers/newsletter.controller.js'

const newsletterRoutes = express.Router()

newsletterRoutes.post("/send-promotion", isauthenticated, authorizationMiddleware(ROLES.ADMIN), sendPromotion )

export default newsletterRoutes