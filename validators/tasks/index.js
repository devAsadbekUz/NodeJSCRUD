const { body, param } = require('express-validator');
const tasks_service = require('../../services/tasks');

const addTaskValidation = () => {
    return [
        body('taskName')
            .notEmpty().withMessage('Task name must not be empty')
            .isLength({ min: 8, max: 255 }).withMessage('Task name must be between 8 and 255 characters long'),
        body('taskDeadline')
            .notEmpty().withMessage('Task deadline must not be empty')
            .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/, 'g')
            .withMessage('Invalid date and time format. Please use "DD/MM/YYYY HH:mm" format.'),
        body('branch')
            .notEmpty().withMessage('Branch must not be empty'),
        body('contactPhone')
            .notEmpty().withMessage('Contact phone must not be empty')
            .matches(/^\+998\d{9}$/).withMessage('Invalid phone number format, it must be +998xxxxxxxxx'),
        body('taskOwner')
            .notEmpty().withMessage('Task Owner must not be empty'),
    ];
};

const deleteTaskValidation = () => {
    return [
        param('id').custom(async (id) => {
            const exists = await tasks_service.getById(id);
            if (!exists) {
                throw new Error('Task not found');
            }
        })
    ];
};

const updateTaskValidation = () => {
    return [
        param('id').custom(async (id) => {
            const exists = await tasks_service.getById(id);
            if (!exists) {
                throw new Error('Task not found');
            }
        }),
        body('taskName')
            .notEmpty().withMessage('Task name must not be empty')
            .isLength({ min: 8, max: 255 }).withMessage('Event name must be between 8 and 255 characters long'),
        body('taskDeadline')
            .notEmpty().withMessage('Deadline time must not be empty')
            .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/, 'g')
            .withMessage('Invalid date and time format. Please use "DD/MM/YYYY HH:mm" format.'),
        body('branch')
            .notEmpty().withMessage('Branch must not be empty'),
        body('contactPhone')
            .notEmpty().withMessage('Contact phone must not be empty')
            .matches(/^\+998\d{9}$/).withMessage('Invalid phone number format, it must be +998xxxxxxxxx'),
        body('taskOwner')
            .notEmpty().withMessage('Task Owner must not be empty'),
    ];
};

module.exports = {
    addTaskValidation,
    updateTaskValidation,
    deleteTaskValidation
};