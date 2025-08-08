import { AppUser } from "./app-user.js";
import { Event } from "./event.js";
import { Food } from "./food.js";
import { Drink } from "./drink.js";
import { sequelize } from "../../config/sequelize-client.js";

//AppUser et Evenment : 0N - 11
AppUser.hasMany(Event, {
    foreignKey: {
        name: "id_app_user",
        allowNull: false,
    },
    as: "events",
});
Event.belongsTo(AppUser, {
    foreignKey: {
        name: "id_app_user",
        allowNull: false,
    },
    as: "appUser",
});

//AppUser et Food : 0N - 11
AppUser.hasMany(Food, {
    foreignKey: {
        name: "id_app_user",
        allowNull: false,
    },
    as: "foods",
});
Food.belongsTo(AppUser, {
    foreignKey: {
        name: "id_app_user",
        allowNull: false,
    },
    as: "appUser",
});

//AppUser et Drink : 0N - 11
AppUser.hasMany(Drink, {
    foreignKey: {
        name: "id_app_user",
        allowNull: false,
    },
    as: "drinks",
});
Drink.belongsTo(AppUser, {
    foreignKey: {
        name: "id_app_user",
        allowNull: false,
    },
    as: "appUser",
});

export {AppUser, Event, Food, Drink, sequelize};