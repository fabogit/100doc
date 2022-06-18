const TodosApp = {
	data() {
		return {
			todos: [],
			enteredTodoText: '',
			editiedTodoId: null
		};
	},
	methods: {
		async saveTodo(event) {
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
				let response;

				try {
					response = await fetch('http://localhost:3000/todos', {
						method: 'POST',
						body: JSON.stringify({
							text: this.enteredTodoText,
						}),
						headers: {
							'Content-Type': 'application/json',
						},
					});
				} catch (error) {
					alert('Something went wrong!');
					return;
				}

				if (!response.ok) {
					alert('Something went wrong!');
					return;
				}

				const responseData = await response.json();

				const newTodo = {
					text: this.enteredTodoText,
					id: responseData.createdTodo.id
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
		},

		deleteTodo(todoId) {
			this.todos = this.todos.filter((todoItem) => todoItem.id !== todoId);
		}
	}
};

Vue.createApp(TodosApp).mount('#todos-app');