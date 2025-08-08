import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize-client.js";

export class AppUser extends Model {}

AppUser.init(
    {
        id_client_shopify: {
            type: DataTypes.TEXT,
            unique: true,
        },
        email: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        role: {
            type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: "user",
        },

    },
    {
        sequelize,
        tableName: "app_user",
    }
);