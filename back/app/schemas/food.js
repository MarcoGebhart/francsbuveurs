import z from "zod";


export const foodSchema = z.object({
    name: z.string().trim().nonempty(),
    description : z.string().trim().nonempty(),
    price: z.coerce.number().int().nonnegative(),
    img: z.string().trim().nonempty(),
    id_app_user: z.coerce.number().int()
});

export const updateFoodSchema = foodSchema.partial();