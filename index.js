const express=require('express')
const app=express()
const path=require('path')
const urlRoute=require('./routes/url.routes')
const URL = require('./models/url.models')
const staticRoute = require('./routes/static.routes')
const {connectDB}=require('./connection')

const PORT=8080

connectDB("mongodb+srv://arnav:arnav123@cluster0.nnbtmu1.mongodb.net/shorturl").then( console.log("DB Connected"))

app.set('view engine', 'ejs')
app.set('views',path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/url',urlRoute)
app.use('/',staticRoute)


app.get('/url/:shortId',async (req,res)=>{
    const shortId=req.params.shortId
    const entry=await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{
            timestamp: Date.now()
        }
    }})
    res.redirect(entry.redirectURL)
})
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})