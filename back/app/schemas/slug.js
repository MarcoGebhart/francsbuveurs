import { z } from "zod";

export const slugSchema = z.object({
  slug: z.string().trim().nonempty("Le slug est requis"),
});