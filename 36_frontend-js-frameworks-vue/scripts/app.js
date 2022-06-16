const TodosApp = {
	data() {
		return {
			todos: [],
			enteredTodoText: ''
		};
	},
	methods: {
		saveTodo(event) {
			event.preventDefault();
			const newTodo = {
				text: this.enteredTodoText,
				id: new Date().toISOString()
			};
			this.todos.push(newTodo);
			// reset to empty
			this.enteredTodoText = null;
		}
	}
};

Vue.createApp(TodosApp).mount('#todos-app');