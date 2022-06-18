const Todo = require('../models/todo.model');

async function getAllTodos(req, res, next) {
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

async function updateTodo(req, res, next) {
	const todoId = req.params.id;
	const newTodoText = req.body.newText;

	const todo = new Todo(newTodoText, todoId);
	try {
		await todo.save();
	} catch (error) {
		return next(error);
	}
	res.json({message: 'Todo updated', updatedTodo: todo});
}

async function deleteTodo(req, res, next) {
	const todoId = req.params.id;

	const todo = new Todo(null, todoId);
	try {
		await todo.delete();
	} catch (error) {
		return next(error);
	}
	res.json({message: 'Todo deleted', deletedTodoId: todoId});
}

module.exports = {
	getAllTodos,
	addTodo,
	updateTodo,
	deleteTodo
};