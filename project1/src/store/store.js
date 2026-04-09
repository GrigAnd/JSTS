import { createStore } from "./createStore.js";
import { rootReducer } from "./reducer.js";
import { loadState, saveState } from "../utils/storage.js";
import { debounce } from "../utils/helpers.js";

const ls_state = loadState();
export const store = createStore(rootReducer, ls_state || { tasks: [], logs: [] });

const debouncedSaveSession = debounce((state) => {
  saveState(state);
}, 500);

store.subscribe(() => {
  debouncedSaveSession(store.getState());
});