const express = require('express')
require('dotenv').config()
require('./config/db')
const Routes = require('./routes/user')
const app = express()

//middleware
app.use(express.json())


//Route
app.use('/api', Routes)

//port
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`server is running on port http://localhost:${PORT}`);
})