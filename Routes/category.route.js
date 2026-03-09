import express from 'express'
import { createCategory, deleteCategory, editCategory, getCategory } from '../Controllers/category.controller.js'
const categoryRoutes = express.Router()

categoryRoutes.get('/categories', getCategory)
categoryRoutes.post('/categories', createCategory)
categoryRoutes.put('/categories/:id', editCategory)
categoryRoutes.delete('/categories/:id', deleteCategory)

export default categoryRoutes