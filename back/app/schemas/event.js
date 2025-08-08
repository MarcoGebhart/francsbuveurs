import z from "zod";


export const eventSchema = z.object({
    title: z.string().trim().nonempty(),
    description : z.string().trim().nonempty(),
    date: z.coerce.date(),
    hour: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, "L'heure doit être au format HH:mm ou HH:mm:ss"),
    img: z.string().trim().nonempty(),
    slug: z.string().nonempty(),
    id_app_user: z.coerce.number().int()
});

export const updateEventSchema = eventSchema.partial();