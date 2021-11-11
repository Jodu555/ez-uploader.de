const Joi = require('joi');

const userRegisterSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(3).max(50).required(),
    email: Joi.string().email().required(),
});

const userLoginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().alphanum().min(3).max(50).required(),
}).xor('username', 'email');

const folderCreationSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
    parent_UUID: Joi.string().guid({ version: ['uuidv4'] }),
    public: Joi.number().integer().min(0).max(1),
    share: Joi.number().integer().min(0).max(1),
})

const folderUpdateSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20),
    parent_UUID: Joi.string().guid({ version: ['uuidv4'] }),
    public: Joi.number().integer().min(0).max(1),
    share: Joi.number().integer().min(0).max(1),
})

const entryCreationSchema = Joi.object({
    type: Joi.string().valid('image', 'text').required(),
    public: Joi.number().integer().min(0).max(1),
    share: Joi.number().integer().min(0).max(1),
})

const entryUpdateSchema = Joi.object({
    public: Joi.number().integer().min(0).max(1),
    share: Joi.number().integer().min(0).max(1),
    folder_UUID: Joi.string().guid({ version: ['uuidv4'] })
})


module.exports = {
    userRegisterSchema,
    userLoginSchema,
    folderCreationSchema,
    folderUpdateSchema,
    entryCreationSchema,
    entryUpdateSchema
};