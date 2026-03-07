
export default function validationMiddleware(validationSchema) {
    return(req, res, next) => {
        const validation = validationSchema.validate(req.body)
        if (validation.error) {
            return res.status(400).json({ error: validation.error.details[0].message })
        }
        next()
    }
}