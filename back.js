const express=require('express')
const app=express()
const cors=require("cors")
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sudhanshusongire26:kkj9AjEGCAaWi0TT@mern2024.ot063.mongodb.net/?retryWrites=true&w=majority&appName=mern2024').catch(error=> console.log(error));

const UserSchema=new mongoose.Schema({
    Email:String,
    password:String
})

const User1=mongoose.model("users",UserSchema)
const BookSchema=new mongoose.Schema({
    title:String,
    author:String,
    description:String,
    image:String
})
const book=mongoose.model("Books",BookSchema)
app.use(cors())

app.use(express.json())
app.get("/",(req,resp)=>{
    return resp.send("Hello World")
})
app.post("/login",async (req,res)=>{
    let a=await req.body
    console.log(a)
    
    const b=await User1.find({Email:a.Email})
    console.log(b)
    if(b.length>0){
        if(b[0].password==a.password){
           return res.send("matched")

        }
       return res.send("incorrect password")

        
    }
    else{
        return res.send("no match")
    }

})

app.post("/register",async (req,res)=>{
    let a=await req.body
    console.log(a)
    a={
        Email:a.Email,
        password:a.password
    }
    
    const b=await User1.find(a)
    if(b.length>0){
        return res.send("exists")
    }
    else{
        User1.create(a)
        return res.send("new user")
    }
})

app.get("/book",async (req,res)=>{
    let book1=await book.find()
    console.log(book1)
    return res.send(book1)

})
app.listen(3000)
