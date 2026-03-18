import { createStore } from "./createStore";
import { reducer } from "./reducer";
import { loadState, saveState } from "../utils/storage";

const ls_state = loadState();
export const store = createStore(reducer, ls_state);

store.subscribe(() => {
  saveState(store.getState());
});