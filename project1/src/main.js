import { store } from "./store/store";
import { TaskController } from "./core/TaskController";
import { List } from "./components/List";
import { Form } from "./components/Form";
import { addStyles, globalStyles } from "./utils/styles";

if (!document.head) {
  const head = document.createElement('head');
  document.appendChild(head);
}

if (!document.body) {
  const body = document.createElement('body');
  document.appendChild(body);
}

document.head.appendChild(document.createElement('title')).textContent = 'Todo List';

addStyles(globalStyles);

const controller = new TaskController(store);

const form = new Form({ controller });
form.mount(document.body);

const list = new List({ store, controller });
list.mount(document.body);