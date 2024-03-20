
const tasks_service = require('../../../services/tasks');

const home_controller = {
    index: async (req, res) => {
        res.render('home');
    },
    add: async (req, res) => {
        res.render('home/add_update', { mode: 'Add' });
    },
    update: async (req, res) => {
        const taskData = await tasks_service.getById(req.params.id);
        res.render('home/add_update', { mode: 'Update', taskData: taskData });
    }
};

module.exports = home_controller;