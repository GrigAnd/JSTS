import { BaseComponent } from "./BaseComponent";

export class Form extends BaseComponent {
  render() {
    const form = document.createElement('form');
    form.setAttribute('class', 'task-form');

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('class', 'task-input');
    input.setAttribute('placeholder', 'Текст задачи');

    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.setAttribute('class', 'task-btn');
    button.textContent = '+';

    form.appendChild(input);
    form.appendChild(button);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = input.value.trim();

      if (title) {
        this.props.controller.addTask(title);
        input.value = '';
      }
    });

    return form;
  }
}


