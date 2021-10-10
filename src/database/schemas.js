const Joi = require('joi');

const userRegisterSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(5).max(50).required(),
    email: Joi.string().email().required(),
});

const userLoginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().alphanum().min(8).max(50).required(),
}).xor('username', 'email');

const folderCreationSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
    parent_UUID: Joi.string().guid({ version: ['uuidv4'] }).required(),
    public: Joi.number().integer().min(0).max(1).required(),
    share: Joi.number().integer().min(0).max(1).required(),
})


module.exports = {
    userRegisterSchema,
    userLoginSchema,
    folderCreationSchema
};