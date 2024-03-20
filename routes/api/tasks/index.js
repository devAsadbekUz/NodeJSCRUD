const express = require('express');

const { validationResult } = require('express-validator');
const { addTaskValidation, updateTaskValidation, deleteTaskValidation } = require('../../../validators/tasks');


const router = express.Router();
const tasks_controller = require('../../../controllers/api/tasks');

// Define API routes
router.get('/', (req, res) => {
    tasks_controller.getAll(req, res);
});


router.post('/', addTaskValidation(), (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    tasks_controller.create(req, res)
})
// asddsfsdfsdfsdf
router.delete('/:id', deleteTaskValidation(), (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    tasks_controller.delete(req, res)
})

router.put('/:id', updateTaskValidation(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    tasks_controller.update(req, res)
})

module.exports = router;