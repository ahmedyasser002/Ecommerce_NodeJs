import { userModel } from "../Models/User.js";
import bcrypt from "bcrypt" ;

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


let updateUserProfile = async (req, res) => {
  const userId = req.user._id;
  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(404).json({message: "User not found"});
  }

  const updates = { ...req.body };
  if (updates.address) {
    updates.address = {
      street: updates.address.street ?? user.address.street, //if left value of ?? is null or undefined then use the right value of ?? else use it
      country: updates.address.country ?? user.address.country,
      city: updates.address.city ?? user.address.city,
      apartment_details:
        updates.address.apartment_details ?? user.address.apartment_details
    };
  }

  if (updates.password) {
    updates.password =  bcrypt.hashSync(updates.password, 8);
  }

  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    updates,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    message: "User profile updated successfully",
    data: updatedUser
  });
};

 export {list_users, updateUser, deleteUser ,updateUserProfile}
 