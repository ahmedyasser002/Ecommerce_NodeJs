import Joi from "joi";

const attributes = {
    name: Joi.string().min(3).max(30).messages({
        "string.empty": "Name is required",
        "string.min": "Name length must be greater than or equal to 3",
        "string.max": "Name length must be less than or equal to 30",
    }),
    phone: Joi.string()
        .pattern(new RegExp("^01[0125][0-9]{8}$"))
        .messages({
            "string.pattern.base": "Phone must match Egyptian phone patterns",
        }),
    password: Joi.string()
        .pattern(new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$"))
        .messages({
            "string.pattern.base":
                "Password must contain at least one uppercase letter, one lowercase letter, and one number",
            "string.empty": "Password is required",
        }),
    email: Joi.string()
        .pattern(new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"))
        .messages({
            "string.pattern.base": "Email must be a valid email",
            "string.empty": "Email is required",
        }),
    role: Joi.string().valid("customer", "seller", "admin"),
    provider: Joi.string().valid("local", "google").default("local"),
    address: Joi.object({
        street: Joi.string().min(5).max(100).messages({
            "string.min": "Street length must be greater than or equal to 5",
            "string.max": "Street length must be less than or equal to 100",
            "string.empty": "Street is required",
        }),
        country: Joi.string().min(3).max(30).messages({
            "string.min": "Country length must be greater than or equal to 3",
            "string.max": "Country length must be less than or equal to 30",
            "string.empty": "Country is required",
        }),
        apartment_details: Joi.string().min(3).max(100).messages({
            "string.min": "Apartment details length must be greater than or equal to 3",
            "string.max": "Apartment details length must be less than or equal to 100",
            "string.empty": "Apartment details is required",
        }),
        city: Joi.string().min(3).max(30).messages({
            "string.min": "City length must be greater than or equal to 3",
            "string.max": "City length must be less than or equal to 30",
            "string.empty": "City is required",
        }),
    }).unknown(false),
};

export const signupValidation = Joi.object({
    email: attributes.email.required(),
    password: attributes.password.when("provider", {
        is: "local",
        then: attributes.password.required(),
        otherwise: attributes.password.optional(),
    }),
    name: attributes.name.required(),
    role:attributes.role,
    provider: attributes.provider,
    phone: attributes.phone,
    address: attributes.address.when("provider", {
        is: "local",
        then: Joi.when("role", {
            is: Joi.valid("customer", "seller"),
            then: attributes.address.required(),
            otherwise: Joi.forbidden(),
        }),
        otherwise: Joi.forbidden(),
    }),
});

export const userManagementValidation = Joi.object({
    password: attributes.password,
    phone: attributes.phone,
    address: attributes.address,
});