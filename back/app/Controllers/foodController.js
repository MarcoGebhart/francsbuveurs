import { Food } from "../models/associations.js"
import { idSchema, updateFoodSchema } from "../schemas/index.js";

export const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.findAll();
        res.json(foods)
    } catch (error) {
        console.log("Error fetching foods data:", error);
        res.status(500).json({error: "Failed to fetch foods data"}); 
    }
}

export const getOneFood = async (req, res) => {
    try {
        const {id} = idSchema.parse(req.params);
        const food = await Food.findByPk(id);

        if(!food) {
            return res.status(404).json({message: "Food non trouvée"})
        };
        res.json(food)
    } catch (error) {
        console.error("Error fetching food data:", error);
        if (error.name === 'ZodError' || error.name === 'ValidationError') {
            return res.status(400).json({ error: "ID de requête invalide", details: error.errors });
        }
        res.status(500).json({error: "Failed to fetch food data"});
    }
}

export const createOneFood = async (req, res) => {
    try {
        const newFood = await Food.create(req.body);
        res.status(201).json(newFood);
    } catch (error) {
        console.error("Erreur création food :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}

export const updateOneFoodById = async (req, res) => {
    try {
        const {id} = idSchema.parse(req.params);
        const data = updateFoodSchema.parse(req.body);
        const food = await Food.findByPk(id);
        if(!food) {
            return res.status(404).json({message: "Food non trouvée"})
        }
        await food.update(data);
        res.json(data)
    } catch (error) {
        console.error("Erreur lors de la mise à jour de food:", error);
        if (error.name === 'ZodError' || error.name === 'ValidationError') {
            return res.status(400).json({ error: "Données de mise à jour invalides ou ID invalide", details: error.errors });
        }
        res.status(500).json({ message: "Erreur interne lors de la mise à jour de food" });
    }
}

export const deleteOneFoodById = async (req, res) => {
    try {
        const {id} = idSchema.parse(req.params);
        const food = await Food.findByPk(id);
        if(!food) {
            return res.status(404).json({message: "Food non trouvée"})
        };
        await food.destroy();
        res.status(204).send();
    } catch (error) {
        console.error("Erreur lors de la suppression de food:", error);
        if (error.name === 'ZodError' || error.name === 'ValidationError') {
            return res.status(400).json({ error: "ID de requête invalide", details: error.errors });
        }
        res.status(500).json({ message: "Erreur interne du serveur lors de la suppression de food" });
    }
}