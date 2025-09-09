import { Router } from "express";

import Url from '../models/url.js';
import { nanoid } from 'nanoid';
import validUrl from "valid-url";

const router = Router();

router.get("/api/:shortCode",async (req,res)=>{
    
   try {
        const url = await Url.findOne({where:{shortCode:req.params.shortCode}});

     if(url){
       return res.redirect(url.originalUrl);
     }else{
       res.status(404).json("Url not found!!");
     }
   } catch (error) {
    console.error(error);
    return res.status(500).json("Server Error");
   }
})

router.post("/api/shorten",async (req,res)=>{
   const {originalUrl} = req.body;
   const Base_URL = process.env.Base_URL;
    if (!validUrl.isUri(originalUrl)) {
      return res.status(400).json("url is not valid");
    }

    try {
      let url = await Url.findOne({where:{originalUrl}});
      if(url){
        return res.status(200).json(url);
      }
      const shortCode = nanoid(7);
      url = await Url.create({
        originalUrl,
        shortCode
      });
      return res.status(201).json(url)
    } catch (error) {
      console.log(error);
      return res.status(500).json("Server Error!!");
    }
})

export default router;