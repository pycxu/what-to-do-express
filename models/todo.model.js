const filename = './todos.json';
const helper = require('../helpers/helper');

// avoid require(filename) which performs cached read
let todos = helper.readJJONFile(filename);

const getTodos = () => {
    return new Promise((resolve, reject) => {
        if(todos.length == 0) {
            reject({
                message: 'no todos available',
                status: 202
            });
        }
        resolve(todos);
    });
}

const getTodo = (id) => {
    return new Promise((resolve, reject) => {
        helper
            .mustBeInArray(todos, id)
            .then((todo) => resolve(todo))
            .catch((err) => reject(err));
    });
}

const addTodo = (newTask) => {
    return new Promise((resolve, reject) => {
        helper
            .mustNotInArray(todos, newTask)
            .then((task) => {
                const id = { id: helper.getNewId(todos) };
                const done = {done: false};
                const newTodo = {...id, ...task, ...done};
                todos.push(newTodo);
                helper.writeJSONFile(filename, todos);
                resolve(newTodo);
            })
            .catch((err) => reject(err));
    });
}

const updateTodo = (id) => {
    return new Promise((resolve, reject) => {
        helper
            .mustBeInArray(todos, id)
            .then((todo) => {
                const index = todos.findIndex(t => t.id == todo.id);
                const id = {id: todo.id};
                const task = {task: todo.task};
                const done = {done: !todo.done};
                todos[index] = {...id, ...task, ...done};
                helper.writeJSONFile(filename, todos);
                resolve(todos[index]);
            })
            .catch((err) => reject(err));
    })
}

const deleteTodo = (id) => {
    return new Promise((resolve, reject) => {
        helper
            .mustBeInArray(todos, id)
            .then((todo) => {
                // todos = todos.filter((t) => t.id !== id); this does not work and I am not sure why
                const index = todos.findIndex(t => t.id == todo.id);
                todos.splice(index, 1);
                helper.writeJSONFile(filename, todos);
                resolve();
            })
            .catch((err) => reject(err));
    });
}

module.exports = {
    getTodos,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo
};