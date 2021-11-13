const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        //To remove the Obejct link
        const user = JSON.parse(JSON.stringify(req.credentials.user));
        delete user.password;
        res.json(user);
    } catch (error) {
        next(error);
    }
});

module.exports = {
    router,
};
