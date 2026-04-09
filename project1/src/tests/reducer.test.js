import { describe, it, expect } from 'vitest';
import { rootReducer } from '../store/reducer.js';

describe('store/reducer', () => {
  it('ADD_TASK', () => {
    const initial = { tasks: [], logs: [] };
    const action = { type: 'ADD_TASK', payload: { title: 'Test Task' } };
    
    const newState = rootReducer(initial, action);
    
    expect(newState.tasks.length).toBe(1);
    expect(newState.tasks[0].title).toBe('Test Task');
    expect(newState.tasks[0].completed).toBe(false);
    expect(newState.tasks[0].deleted).toBe(false);
    
    expect(newState.logs.length).toBe(1);
    expect(newState.logs[0].msg).toContain('Test Task');
  });

  it('DELETE_TASK', () => {
    const initialState = { 
      tasks: [{ id: 1, title: 'T1', completed: false, deleted: false }],
      logs: []
    };
    const action = { type: 'DELETE_TASK', payload: { id: 1, title: 'T1' } };
    
    const newState = rootReducer(initialState, action);
    
    expect(newState.tasks[0].deleted).toBe(true);
    expect(newState.logs.length).toBe(1);
    expect(newState.logs[0].msg).toContain('T1');
  });

  it('TOGGLE_TASK', () => {
    const initialState = { 
      tasks: [{ id: 2, title: 'T2', completed: false, deleted: false }],
      logs: []
    };
    const action = { type: 'TOGGLE_TASK', payload: { id: 2, title: 'T2', newStatus: true } };
    
    const newState = rootReducer(initialState, action);
    
    expect(newState.tasks[0].completed).toBe(true);
    expect(newState.logs.length).toBe(1);
    expect(newState.logs[0].msg).toContain('Выполнена');
  });

  it('EDIT_TASK', () => {
    const initialState = { 
      tasks: [{ id: 3, title: 'T3', completed: false, deleted: false }],
      logs: []
    };
    const action = { type: 'EDIT_TASK', payload: { id: 3, oldTitle: 'T3', newTitle: 'T3 Updated' } };
    
    const newState = rootReducer(initialState, action);
    
    expect(newState.tasks[0].title).toBe('T3 Updated');
    expect(newState.logs.length).toBe(1);
    expect(newState.logs[0].msg).toContain('T3 Updated');
  });
});
