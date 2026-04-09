export class TaskController {
  constructor(store) {
    this.store = store;
  }

  addTask(title) {
    this.store.dispatch({ type: 'ADD_TASK', payload: { title } });
  }

  deleteTask(id, title) {
    this.store.dispatch({ type: 'DELETE_TASK', payload: { id, title } });
  }

  toggleTask(id, title, newStatus) {
    this.store.dispatch({ type: 'TOGGLE_TASK', payload: { id, title, newStatus } });
  }

  editTask(id, oldTitle, newTitle) {
    this.store.dispatch({ type: 'EDIT_TASK', payload: { id, oldTitle, newTitle } });
  }

  restoreTask(id, title) {
    this.store.dispatch({ type: 'RESTORE_TASK', payload: { id, title } });
  }

  clearLog() {
    this.store.dispatch({ type: 'CLEAR_LOG' });
  }

  clearCompleted() {
    this.store.dispatch({ type: 'CLEAR_COMPLETED' });
  }
}