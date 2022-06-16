const TodosApp = {
	data() {
		return {
			todos: [],
			enteredTodoText: '',
			editiedTodoId: null
		};
	},
	methods: {
		saveTodo(event) {
			event.preventDefault();
			// create if new/update if exist
			if (this.editiedTodoId) {
				const todoId = this.editiedTodoId;
				const todoIndex = this.todos.findIndex((todoItem) => todoItem.id === todoId);
				// override item
				const updatedTodoItem = {
					id: this.todos[todoIndex],
					text: this.enteredTodoText
				};
				this.todos[todoIndex] = updatedTodoItem;
				// reset id
				this.editiedTodoId = null;
			} else {
				const newTodo = {
					text: this.enteredTodoText,
					id: new Date().toISOString()
				};
				this.todos.push(newTodo);
			}

			// reset to empty
			this.enteredTodoText = null;
		},
		startEditTodo(todoId) {
			this.editiedTodoId = todoId;
			const todo = this.todos.find((todoItem) => todoItem.id === todoId);
			this.enteredTodoText = todo.text;
		}
	}
};

Vue.createApp(TodosApp).mount('#todos-app');