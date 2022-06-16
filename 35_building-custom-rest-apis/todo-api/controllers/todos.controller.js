const Todo = require('../models/todo.model');

async function getAllTodos(request, res, next) {
	let allTodos;
	try {
		allTodos = await Todo.getAllTodos();
	} catch (error) {
		return next(error);
	}

	res.json({todos: allTodos});
}

async function addTodo(req, res, next) {
	const todoText = req.body.text;
	const todo = new Todo(todoText);
	let todoId;

	try {
		const result = await todo.save();
		todoId = result.insertedId;
	} catch (error) {
		return next(error);
	}

	// set id after db document inserttion
	todo.id = todoId.toString();
	res.json({message: 'Added todo successfully', createdTodo: todo});
}

function updateTodo(req, res) {

}

function deleteTodo(req, res) {

}

module.exports = {
	getAllTodos,
	addTodo,
	updateTodo,
	deleteTodo
};