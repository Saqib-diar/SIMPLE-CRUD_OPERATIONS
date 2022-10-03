const express = require('express')
require('dotenv').config()
require('./config/db')
const User = require("./model/user")

const app = express()
app.use(express.json())


//CRUD
//1) CREATE
app.post('/api/create', async (req, res)=> {

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
            res.status(201).json({message: 'user create successfull', user})
        }
        
    } catch (error) {
        console.log(error)
    }
})


//2) READ
app.get('/api/read', async (req, res)=>{
    try {
        const read = await User.find()
        res.status(200).json(read)
    } catch (error) {
        console.log(error)
    }
})


//3) UPDATE
app.put('/api/update/:id', async (req, res)=>{
    
    const {name, email} = req.body;
    // const { id }  = req.params;
    console.log(req.params.id)

    try {
        const ismatch = await User.findById({_id: req.params.id})
        // console.log(ismatch)

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
})


//4) delete
app.delete('/api/delete/:id', async (req, res)=>{
    try {
       const dlt = await User.deleteOne({_id: req.params.id})
       res.status(200).json({message: "user is deleted successfully"})
     
    } catch (error) {
        console.log(error)
    }
})



const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`server is running on port http://localhost:${PORT}`);
})