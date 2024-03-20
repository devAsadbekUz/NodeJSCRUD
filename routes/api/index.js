const express = require('express')
const tasks_router = require('./tasks')

const router = express.Router()

// registering child routers
router.use('/tasks', tasks_router)
module.exports = router