const fs = require('fs')

// access global mock db file
const tasks = require(global.mock_db)

// write service method implementations
const tasks_service = {
    getAll() {
        return tasks
    },
    getById(id) {
        return tasks.find(t => t.id == id)
    },
    create(req, res) {
        let new_id = genRandId(4)

        const task = req.body

        const new_task = {
            id: new_id,
            task: task
        }

        tasks.push(new_task)

        writeToFile(tasks)

        return new_task
    },
    delete(id) {
        const index = tasks.findIndex(u => u.id == id)
        tasks.splice(index, 1)
        writeToFile(tasks)
    },
    update(id, updateData) {
        const taskIndex = tasks.findIndex(t => t.id == id)

        if (taskIndex === -1) {
            return null
        }

        tasks[taskIndex].task = { ...tasks[taskIndex].task, ...updateData }

        writeToFile(tasks)

        return tasks[taskIndex]
    }
}

// create function for overwriting the db file updated db content
let writeToFile = async (users) => {
    await
        fs.writeFileSync(
            global.mock_db,
            JSON.stringify(
                users, null, 4
            ),
            'utf8'
        )
}

// generate random id inspired by uuid
let genRandId = (count) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < count; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

module.exports = tasks_service