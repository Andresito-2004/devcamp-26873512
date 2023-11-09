const express = require('express')
const userModel = require('../models/UsersModel');
const router = express.Router()

router.post('/register', async (request, response) => {
    try {
        const user = await userModel.create(request.body)
        response
            .status(201)
            .json({
                succes: true,
                data: "usuario registrado"
            })
    }
    catch(error) {
        response
            .status(400)
            .json({
                succes: false,
                msg: error.message
            })
    }

})
module.exports = router
