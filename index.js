import 'dotenv/config';

import express from "express";
import sequelize from './config/database.js';
import Url from './models/url.js';
import { nanoid } from 'nanoid';
import validUrl from "valid-url";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('URL Shortener API is running!');
});

app.get("api/:shortCode",async (req,res)=>{
    
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

async function startServer(){
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await Url.sync();
    console.log("Database synced");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});
  } catch (error) {
    console.log(error);
  }
}
startServer();

app.post("/api/shorten",async (req,res)=>{
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