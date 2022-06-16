const TodosApp = {
	data() {
		return {
			newTodo: 'Learn Vue.js!',
			// two way binding
			enteredTodoText: ''
		};
	},
	methods: {
		saveTodo(event) {
			event.preventDefault();
			// two way binding, <input v-model=""">
			this.newTodo = this.enteredTodoText;
			this.enteredTodoText = '';
		}
	}
};

Vue.createApp(TodosApp).mount('#todos-app');