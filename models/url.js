import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Url = sequelize.definr("Url",{
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