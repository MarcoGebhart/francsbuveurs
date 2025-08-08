
export function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json({
                message: "Erreur de validation",
                errors: result.error.flatten().fieldErrors,
            });
        }
        req.body = result.data;
        next();
    };
}