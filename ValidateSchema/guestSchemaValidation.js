import Joi from "joi";
import PasswordComplexity from "joi-password-complexity";

export const singUpSchema = {
  first_name: Joi.string().required,
  last_name: Joi.string().required,
  email: Joi.string().required().email(),
  password: new PasswordComplexity({
    min: 8,
    max: 25,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4
  }),
  roleName: Joi.string().required()
};

export const loginSchema = {
  email: Joi.string().required().email(),
  password: new PasswordComplexity({
    min: 8,
    max: 25,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4
  })
};
