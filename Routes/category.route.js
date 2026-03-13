import express from 'express'
import { createCategory, deleteCategory, editCategory, getCategory } from '../Controllers/category.controller.js'
import { isauthenticated } from '../Middlewares/authenticationMiddleware.js'
import { authorizationMiddleware } from '../Middlewares/autorizationMiddleware.js'
import { ROLES } from '../Constants/roles.js'
const categoryRoutes = express.Router()

categoryRoutes.get('/list-categories', isauthenticated, authorizationMiddleware(ROLES.ADMIN), getCategory)
categoryRoutes.post('/add-category', isauthenticated, authorizationMiddleware(ROLES.ADMIN), createCategory)
categoryRoutes.put('/edit-category/:id', isauthenticated, authorizationMiddleware(ROLES.ADMIN), editCategory)
categoryRoutes.delete('/delete-category/:id', isauthenticated, authorizationMiddleware(ROLES.ADMIN), deleteCategory)

export default categoryRoutes