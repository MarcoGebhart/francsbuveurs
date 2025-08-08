import { Event } from "../models/associations.js";
import { slugSchema, idSchema, updateEventSchema} from "../schemas/index.js";
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            order: [['date','ASC']],
        });
        res.json(events)
    } catch (error) {
        console.log("Error fetching events data:", error);
    res.status(500).json({error: "Failed to fetch events data"});
    }
}

export const getOneEvent = async (req, res) => {
    try {
        const {id} = idSchema.parse(req.params);
        const event = await Event.findByPk(id);

        if(!event) {
            return res.status(404).json({message: "Evenement non trouvé"})
        };
        res.json(event)
    } catch (error) {
        console.error("Error fetching event data:", error);
    if (error.name === 'ZodError' || error.name === 'ValidationError') {
      return res.status(400).json({ error: "ID de requête invalide", details: error.errors });
    }
    res.status(500).json({error: "Failed to fetch event data"});
    }
}

export const getOneBySlug = async (req, res) => {
    try {
      const { slug } = slugSchema.parse(req.params);
  
      const event = await Event.findOne({where: {slug}});
      if (!event) {
        return res.status(404).json({ message: "Evenement non trouvée pour ce slug" });
      }
      res.json(event)
    } catch (error) {
      console.error("Error fetching event data:", error);
      if (error.name === 'ZodError' || error.name === 'ValidationError') {
        return res.status(400).json({ error: "Slug de requête invalide", details: error.errors });
      }
      res.status(500).json({error: "Failed to fetch event data"});
    }
}

export const createdOneEvent = async (req, res) => {
    try {
      const newEvent = await Event.create(req.body);
      res.status(201).json(newEvent);
    } catch (error) {
      console.error("Erreur création événement :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
};

export async function updateOneEventById(req, res) {
    try {
      const { id } = idSchema.parse(req.params);
      const data = updateEventSchema.parse(req.body);
      const event = await Event.findByPk(id);
      if (!event) {
        return res.status(404).json({ message: "Evènemement non trouvée" });
      };
      await event.update(data);
      res.json(data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'évènement:", error);
      if (error.name === 'ZodError' || error.name === 'ValidationError') {
        return res.status(400).json({ error: "Données de mise à jour invalides ou ID invalide", details: error.errors });
      }
        res.status(500).json({ message: "Erreur interne lors de la mise à jour de l'évènement" });
    }
}

export async function deleteOneEventById(req, res) {
    try {
      const { id } = idSchema.parse(req.params);
      const event = await Event.findByPk(id);
      if (!event) {
        return res.status(404).json({ message: "Evènement non trouvée" });
      }
      await event.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'évènement:", error);
      if (error.name === 'ZodError' || error.name === 'ValidationError') {
        return res.status(400).json({ error: "ID de requête invalide", details: error.errors });
      }
        res.status(500).json({ message: "Erreur interne du serveur lors de la suppression de l'évènement" });
    }
  }
