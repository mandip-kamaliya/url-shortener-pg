import 'dotenv/config';
import express from 'express';
import { QueryTypes } from 'sequelize'; // <-- ADD THIS IMPORT
import sequelize from './config/database.js';
import Url from './models/url.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('URL Shortener API is running!');
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');

    // ADD THIS NEW BLOCK TO CHECK THE VERSION
    const [results] = await sequelize.query("SELECT version();", { type: QueryTypes.SELECT });
    console.log('✅ Node.js is connected to Server Version:', results.version);
    // END OF NEW BLOCK

    await Url.sync();
    console.log('✅ "Urls" table has been synced.');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error)
 {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();

