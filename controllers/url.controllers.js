const shortlink = require('shortlink');
const URL = require('../models/url.models')

async function generateNewShortURL(req,res){
    const body=req.body
    if(!body.url){
       return res.status(400).json({ error: 'url is required' })
    }
    const shortID=shortlink.generate(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitedHistory: []
    })
    return res.render('home',{
        id:shortID,
    })
}

async function generateAnalytics(req,res){
    const shortId=req.params.shortId;
    const result = await URL.findOne({ shortID:shortId })
    return res.json({
        totaClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports={
    generateNewShortURL,
    generateAnalytics
}
