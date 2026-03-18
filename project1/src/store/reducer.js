const initState = [];

export function reducer(state = initState, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now(), title: action.payload.title, completed: false }];
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload.id);
    case 'TOGGLE_TASK':
      return state.map(task => task.id === action.payload.id ? { ...task, completed: !task.completed } : task);
    case 'EDIT_TASK':
      return state.map(task => task.id === action.payload.id ? { ...task, title: action.payload.title } : task);
    default:
      return state;
  }
}