<<<<<<< HEAD
=======
import AppError from "../Utils/AppError.js"

>>>>>>> user_authenication
export default function validationMiddleware(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body)

        if (error) {
            return next(new AppError(error.details[0].message, 400))
        }

        next()
    }
}
