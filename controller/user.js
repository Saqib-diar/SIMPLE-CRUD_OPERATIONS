const User = require("../model/user")

//CRUD 

//1) CREATE
const createUser =  async (req, res)=> {

    const { name, email } = req.body

    try {
        if(!name || !email) {
           return res.status(400).json({message: 'please fill all the fields'})
        }

        const chk = await User.findOne({email})
        if(chk) {
            return res.status(400).json({message: 'email already exist'})
        } else {
            const user = await User.create({name, email})
            res.status(201).json({message: 'user created successfull', user})
        }
        
    } catch (error) {
        console.log(error)
    }
}


// 2) READ
const getAllUsers = async (req, res)=>{
    try {
        const read = await User.find()
        res.status(200).json(read)
    } catch (error) {
        console.log(error)
    }
}


// 3) UPDATE
const updateUser =  async (req, res)=>{
    const {name, email} = req.body;

    try {
        const ismatch = await User.findById({_id: req.params.id})

        if(!ismatch){
           return res.status(400).json({message: "user not found with this id"})
        } else {
            const updateUser = await User.updateOne(
                { _id: req.params.id },
                {
                    $set: {
                       name: name,
                       email: email
                    },
                }
            );
           return res.status(200).json({message: "user updated successfull"})
        
        }

    } catch (error) {
        console.log(error)
    }
}

// 4) DELETE
const deleteUser =  async (req, res)=>{
    try {
        const chk = await User.findOne({_id: req.params.id})
        if(!chk) {
            return res.status(400).json({error: `user with the id ${req.params.id} does not exist`})
        }

       const dlt = await User.deleteOne({_id: req.params.id})
       res.status(200).json({message: "user is deleted successfully"})
     
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
}