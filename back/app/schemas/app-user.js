import { z } from "zod";


export const appUserSchema = z.object({
    id_client_shopify: z.string().trim(),
    email: z.string().trim().nonempty().email(),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères").regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
        "Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial"
      ),
    role: z.enum(["admin", "user"]).optional() 
});

export const updateAppUserSchema = appUserSchema.partial();