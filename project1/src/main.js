import { store } from "./store/store.js";
import { TaskController } from "./core/TaskController.js";
import { App } from "./components/App.js";
import { theme } from "./utils/theme.js";

document.body.innerHTML = '';
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.backgroundColor = theme.colors.background;
document.body.style.fontFamily = theme.fontFamily;

document.head.appendChild(document.createElement('title')).textContent = 'Task Manager';

const controller = new TaskController(store);

const app = new App({ store, controller });
app.mount(document.body);