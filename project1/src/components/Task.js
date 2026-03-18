import { BaseComponent } from "./BaseComponent";

export class Task extends BaseComponent {
  render() {
    const taskEl = document.createElement('div');
    taskEl.setAttribute('class', 'task-item');

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'task-wrapper');

    const check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.setAttribute('class', 'task-checkbox');
    check.checked = this.props.completed;
    check.addEventListener('change', () => {
      this.props.controller.toggleTask(this.props.id);
    });

    const textSpan = document.createElement('span');
    textSpan.textContent = this.props.title;
    if (this.props.completed) {
      textSpan.setAttribute('class', 'task-title completed');
    } else {
      textSpan.setAttribute('class', 'task-title');
    }

    wrapper.appendChild(check);
    wrapper.appendChild(textSpan);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', () => {
      this.props.controller.deleteTask(this.props.id);
    });

    taskEl.appendChild(wrapper);
    taskEl.appendChild(deleteBtn);

    return taskEl;
  }
}