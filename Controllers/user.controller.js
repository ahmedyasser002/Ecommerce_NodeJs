import { userModel } from "../Models/User.js";

let list_users = async (req,res)=>{
    let users = await userModel.find()
    res.status(200).json({message: "Users retrieved successfully",count: users.length,dta: users
    });}

let deleteUser =async (req,res) => {
    let id = req.params.id
    const deleteUser = await userModel.findByIdAndDelete(id)
     if (!deleteUser) {
      return res.status(404).json({message: "User not found"});
    }

    res.status(200).json({
      message: "User deleted successfully",data: deleteUser});
 }

 let updateUser = async(req,res)=>{
     let id = req.params.id
     const updatedUser = await userModel.findByIdAndUpdate(id,req.body,{ new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({message: "User not found"});
    }
        res.status(200).json({message: "User updated successfully",data: updatedUser});
 }

 export {list_users, updateUser, deleteUser}
 