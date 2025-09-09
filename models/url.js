import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Url = sequelize.define("Url",{
    originalUrl:{
        type:DataTypes.STRING,
        allowNull:false
    },
    shortCode:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    shortUrl:{
        type:DataTypes.VIRTUAL,
        get(){
            return `${process.env.BASE_URL}/${this.shortCode}`
        }
    }
}
)
export default Url;