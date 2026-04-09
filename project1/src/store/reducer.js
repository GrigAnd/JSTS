import { combineReducers } from './createStore.js';
import { clone } from '../utils/helpers.js';

const initialTasks = [];

function tasksReducer(state = initialTasks, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const newState = clone(state);
      newState.push({ id: Date.now(), title: action.payload.title, completed: false, deleted: false });
      return newState;
    }
    case 'DELETE_TASK': {
      const newState = clone(state);
      const idx = newState.findIndex(task => task.id === action.payload.id);
      if (idx !== -1) {
        newState[idx].deleted = true;
      }
      return newState;
    }
    case 'RESTORE_TASK': {
      const newState = clone(state);
      const idx = newState.findIndex(task => task.id === action.payload.id);
      if (idx !== -1) {
        newState[idx].deleted = false;
      }
      return newState;
    }
    case 'TOGGLE_TASK': {
      const newState = clone(state);
      const idx = newState.findIndex(task => task.id === action.payload.id);
      if (idx !== -1) {
        newState[idx].completed = !newState[idx].completed;
      }
      return newState;
    }
    case 'EDIT_TASK': {
      const newState = clone(state);
      const idx = newState.findIndex(task => task.id === action.payload.id);
      if (idx !== -1) {
        newState[idx].title = action.payload.newTitle;
      }
      return newState;
    }
    case 'CLEAR_COMPLETED': {
      const newState = clone(state);
      newState.forEach(task => {
        if (task.completed && !task.deleted) {
          task.deleted = true;
        }
      });
      return newState;
    }
    default:
      return state;
  }
}

const initialLogs = [];

function logsReducer(state = initialLogs, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const newState = clone(state);
      newState.push({ id: Date.now(), msg: `Задача создана: "${action.payload.title}"`, time: Date.now() });
      return newState;
    }
    case 'DELETE_TASK': {
      const newState = clone(state);
      newState.push({ id: Date.now(), msg: `Задача удалена: "${action.payload.title}"`, time: Date.now() });
      return newState;
    }
    case 'RESTORE_TASK': {
      const newState = clone(state);
      newState.push({ id: Date.now(), msg: `Задача восстановлена: "${action.payload.title}"`, time: Date.now() });
      return newState;
    }
    case 'TOGGLE_TASK': {
      const newState = clone(state);
      const statusText = action.payload.newStatus ? 'Выполнена' : 'Активна';
      newState.push({ id: Date.now(), msg: `Изменен статус на [${statusText}]: "${action.payload.title}"`, time: Date.now() });
      return newState;
    }
    case 'EDIT_TASK': {
      const newState = clone(state);
      newState.push({ id: Date.now(), msg: `Задача изменена: "${action.payload.oldTitle}" -> "${action.payload.newTitle}"`, time: Date.now() });
      return newState;
    }
    case 'CLEAR_LOG': {
      return [];
    }
    case 'CLEAR_COMPLETED': {
      const newState = clone(state);
      newState.push({ id: Date.now(), msg: `Удалены все выполненные задачи`, time: Date.now() });
      return newState;
    }
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  logs: logsReducer
});