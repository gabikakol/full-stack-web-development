const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { url: 1, title: 1, author: 1 })

    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const {username, name, password } = request.body

    if (password.length <= 3) {
        return response
                .status(400)
                .json({
                    error: 'Password is shorter than 3 characters'
                })
    }

    const rounds = 10
    const passwordHash = await bcrypt.hash(password, rounds)

    const user = new User({
        username,
        name, 
        passwordHash,
    })

    const userSaved = await user.save()

    response.status(201).json(userSaved)
})

module.exports = usersRouter