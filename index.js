const express = require("express")
const app=express();
const dotenv = require("dotenv")
const mongoose=require("mongoose")
const cors=require("cors")
const categoryRoutes = require("./routes/category");
const userRoutes = require('./routes/user')
const serviceRoutes = require('./routes/services');
const adminRoutes = require('./routes/admin')
const requestRoutes = require('./routes/request')
app.use(cors())
app.use(express.json({extended:true}))
app.use(express.urlencoded({ extended: true }));
dotenv.config()
console.log(process.env.DB_URL)
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then( () => {
    console.log("Connection open")
}).catch(err => {
    console.log("OOPS !! ERROR",err)
})



app.get('/',(req,res)=>{
    res.redirect('/api')
})

app.get('/api/',async(req,res)=>{
    res.send("Insta Seva ")
})

app.use('/api/category',categoryRoutes)
app.use('/api/services',serviceRoutes)
app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/request',requestRoutes)

app.use("*",(req,res)=>{
    res.status(500).send("Error Occured")
})

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Started listening on port",PORT)
})


