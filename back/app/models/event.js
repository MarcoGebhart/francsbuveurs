import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize-client.js";

export class Event extends Model {}

Event.init(
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false, 
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        hour: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        img: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        slug: {
            type: DataTypes.TEXT,
            allowNull: false,
        }

    },
    {
        sequelize,
        tableName: "event",
    }

);