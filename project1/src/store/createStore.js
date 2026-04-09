export function createStore(reducer, initState) {
  let state = initState;
  let listeners = [];

  function getState() { return state; }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }

  dispatch({ type: '@@INIT' });

  return { getState, dispatch, subscribe };
}

export function combineReducers(reducers) {
  return function (state = {}, action) {
    const nextState = {};
    let hasChanged = false;
    
    for (const key in reducers) {
      if (Object.prototype.hasOwnProperty.call(reducers, key)) {
        const reducer = reducers[key];
        const previousStateForKey = state[key];
        const nextStateForKey = reducer(previousStateForKey, action);
        nextState[key] = nextStateForKey;
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
      }
    }
    
    return hasChanged ? nextState : state;
  };
}