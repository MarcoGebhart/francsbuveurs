import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize-client.js";

export class Drink extends Model {}

Drink.init(
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false, 
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        img: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "drink",
    }

);