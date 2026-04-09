import { BaseComponent } from "./BaseComponent.js";
import { applyStyles, theme } from "../utils/theme.js";

export class Form extends BaseComponent {
  render() {
    const form = document.createElement('form');
    applyStyles(form, {
      display: 'flex',
      marginBottom: '20px',
      marginTop: '20px',
      width: '100%',
      maxWidth: '400px',
      justifyContent: 'center'
    });

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Добавить задачу...';
    applyStyles(input, {
      padding: '10px',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: theme.borderRadius,
      fontSize: '16px',
      width: '100%',
      backgroundColor: theme.colors.primary,
      color: theme.colors.textDark
    });

    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.textContent = '+';
    applyStyles(btn, {
      padding: '8px 16px',
      marginLeft: '10px',
      borderRadius: theme.borderRadius,
      backgroundColor: theme.colors.primary,
      border: 'none',
      cursor: 'pointer',
      fontSize: '24px',
      color: theme.colors.textDark
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (text) {
        this.props.controller.addTask(text);
        input.value = '';
      }
    });

    form.appendChild(input);
    form.appendChild(btn);

    return form;
  }
}
