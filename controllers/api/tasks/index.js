
const tasks_service = require('../../../services/tasks/')

// mention the service's needed actions (methods)
const tasks_controller = {
    getAll(req, res) {
        res.json(tasks_service.getAll())
    },
    create(req, res) {
        res.status(201).json(
            tasks_service.create(req, res)
        )
    },
    delete(req, res) {
        const tasks = tasks_service.getById(req.params.id)

        if (tasks) {
            tasks_service.delete(req.params.id)
            res.status(204).send('Tasks deleted successfully')
        } else {
            res.status(404).send('Tasks not found')
        }
    },

    update(req, res) {
        const task = tasks_service.update(req.params.id, req.body)

        if (task) {
            res.json(task)
        } else {
            res.status(404).send('Task not found')
        }
    }
}


module.exports = tasks_controller