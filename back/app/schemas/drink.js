import z from "zod";


export const drinkSchema = z.object({
    name: z.string().trim().nonempty(),
    price: z.coerce.number().int().nonnegative(),
    img: z.string().trim().nonempty(),
    id_app_user: z.coerce.number().int()
});

export const updateDrinkSchema = drinkSchema.partial();