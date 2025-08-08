import { Drink } from "../models/associations.js";
import {idSchema, updateDrinkSchema} from "../schemas/index.js";

export const getAllDrinks = async (req, res) => {
    try {
        const drinks = await Drink.findAll();
        res.json(drinks)
    } catch (error) {
        console.log("Error fetching drinks data:", error);
        res.status(500).json({error: "Failed to fetch drinks data"}); 
    }
}

export const getOneDrink = async (req, res) => {
    try {
        const {id} = idSchema.parse(req.params);
        const drink = await Drink.findByPk(id);

        if(!drink) {
            return res.status(404).json({message: "Boisson non trouvée"})
        };
        res.json(drink)
    } catch (error) {
        console.error("Error fetching drink data:", error);
        if (error.name === 'ZodError' || error.name === 'ValidationError') {
            return res.status(400).json({ error: "ID de requête invalide", details: error.errors });
        }
        res.status(500).json({error: "Failed to fetch drink data"});
    }
}

export const createOneDrink = async (req, res) => {
    try {
        const newDrink = await Drink.create(req.body);
        res.status(201).json(newDrink);
    } catch (error) {
        console.error("Erreur création de la boisson :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

export const updateOneDrinkById = async (req, res) => {
    try {
        const {id} = idSchema.parse(req.params);
        const data = updateDrinkSchema.parse(req.body);
        const drink = await Drink.findByPk(id);
        if(!drink) {
            return res.status(404).json({message: "boisson non trouvée"})
        }
        await drink.update(data);
        res.json(data)
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la boisson:", error);
        if (error.name === 'ZodError' || error.name === 'ValidationError') {
            return res.status(400).json({ error: "Données de mise à jour invalides ou ID invalide", details: error.errors });
        }
        res.status(500).json({ message: "Erreur interne lors de la mise à jour de la boisson" });
    }
}

export const deleteOneDrinkById = async (req, res) => {
    try {
        const {id} = idSchema.parse(req.params);
        const drink = await Drink.findByPk(id);
        if(!drink) {
            return res.status(404).json({message: "Boisson non trouvée"})
        };
        await drink.destroy();
        res.status(204).send();
    } catch (error) {
        console.error("Erreur lors de la suppression de la boisson:", error);
        if (error.name === 'ZodError' || error.name === 'ValidationError') {
            return res.status(400).json({ error: "ID de requête invalide", details: error.errors });
        }
        res.status(500).json({ message: "Erreur interne du serveur lors de la suppression de la boisson" });
    }
}