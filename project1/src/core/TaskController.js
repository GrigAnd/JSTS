export class TaskController {
  constructor(store) {
    this.store = store;
  }

  addTask(title) {
    this.store.dispatch({ type: 'ADD_TASK', payload: { title } });
  }

  deleteTask(id) {
    this.store.dispatch({ type: 'DELETE_TASK', payload: { id } });
  }

  toggleTask(id) {
    this.store.dispatch({ type: 'TOGGLE_TASK', payload: { id } });
  }

  editTask(id, title) {
    this.store.dispatch({ type: 'EDIT_TASK', payload: { id, title } });
  }
}