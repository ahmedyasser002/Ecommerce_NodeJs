import { categoryModel } from "../Models/Category.js"

const getCategory = async (req,res) => {
   let categories = await categoryModel.find()
   res.json({message : "all categories", data: categories})
}

const createCategory = async(req, res) =>{
    let newCategory = await categoryModel.insertMany(req.body)
    res.json({message:"category created", data: newCategory})
}

const editCategory = async (req, res) => {
    let id = req.params.id
    let editedCategory = await categoryModel.findByIdAndUpdate(id, req.body , {new:true})
    res.json({message: "category updated", data: editedCategory})
}

const deleteCategory = async (req, res) => {
    let id = req.params.id
    let deletedCategory = await categoryModel.findByIdAndDelete(id) 
    res.json({message: "category deleted", data : deletedCategory})
}


export {getCategory, createCategory, editCategory, deleteCategory}