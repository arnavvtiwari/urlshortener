const express=require('express')
const { generateNewShortURL, generateAnalytics }=require('../controllers/url.controllers')
const router=express.Router()

router.post('/',generateNewShortURL)

router.get('/analytics/:shortid', generateAnalytics)

module.exports=router