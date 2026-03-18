import { BaseComponent } from "./BaseComponent";
import { Task } from "./Task";

export class List extends BaseComponent {
  constructor(props) {
    super(props);
    this.container = document.createElement('div');
    this.container.setAttribute('class', 'task-list');
    this.unsubscribe = this.props.store.subscribe(() => this.update());
  }

  update() {
    const state = this.props.store.getState();
    this.container.innerHTML = '';

    state.forEach(task => {
      const taskComponent = new Task({ ...task, controller: this.props.controller });
      taskComponent.mount(this.container);
    });
  }

  render() {
    this.update();
    return this.container;
  }

}