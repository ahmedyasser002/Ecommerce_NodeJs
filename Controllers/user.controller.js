import { userModel } from "../Models/User";

let list_users = async (req,res)=>{
    let users = await userModel.find()
    res.json({mesaage: "List of users", data: users});
}

let deleteUser =async (req,res) => {
    let id = req.params.id
    const deleteUser = await userModel.findByIdAndDelete(id)
    res.json({message: "user deleted"})
 }

 