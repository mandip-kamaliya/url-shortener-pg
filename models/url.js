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
    }
}
)
export default Url;