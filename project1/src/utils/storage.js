const LS_KEY = 'task_list';

export const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(LS_KEY, serialized);
  } catch (e) {
    console.error('Error while saveState', e);
  }
};

export const loadState = () => {
  try {
    const serialized = localStorage.getItem(LS_KEY);
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (e) {
    console.error('Error while loadState', e);
    return undefined;
  }
};
