import 'dotenv/config';

import express from "express";
import sequelize from './config/database.js';
import Url from './models/url.js';
import router from './routes/url.js';


const app = express();
app.use(express.json());

app.use("/",rou)

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('URL Shortener API is running!');
});



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

