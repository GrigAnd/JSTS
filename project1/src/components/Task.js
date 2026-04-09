import { BaseComponent } from "./BaseComponent.js";
import { applyStyles, theme } from "../utils/theme.js";

export class Task extends BaseComponent {
  constructor(props) {
    super(props);
    this.isEditing = false;
  }

  mount(parent) {
    if (!this.el) {
      this.el = document.createElement('div');
      applyStyles(this.el, {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius,
        boxSizing: 'border-box'
      });
    }
    this.updateView();
    parent.appendChild(this.el);
  }

  updateView() {
    this.el.innerHTML = '';
    const { task, controller } = this.props;

    const wrapper = document.createElement('div');
    applyStyles(wrapper, {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flex: '1'
    });

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    applyStyles(checkbox, {
      width: '16px',
      height: '16px',
      cursor: 'pointer',
      accentColor: theme.colors.success
    });

    checkbox.addEventListener('change', () => {
      controller.toggleTask(task.id, task.title, checkbox.checked);
    });

    let titleArea;
    let saveEditCallback = null;

    if (this.isEditing) {
      titleArea = document.createElement('input');
      titleArea.type = 'text';
      titleArea.value = task.title;
      applyStyles(titleArea, {
        flex: '1',
        padding: '4px',
        fontSize: '16px',
        border: `1px solid ${theme.colors.border}`,
        borderRadius: '2px',
        marginRight: '10px'
      });

      saveEditCallback = () => {
        if (!this.isEditing) return;
        const newTitle = titleArea.value.trim();
        this.isEditing = false;
        
        if (newTitle && newTitle !== task.title) {
          controller.editTask(task.id, task.title, newTitle);
        } else {
          this.updateView();
        }
      };

      titleArea.addEventListener('blur', () => {
        setTimeout(() => {
          if (this.isEditing) saveEditCallback();
        }, 150);
      });
      titleArea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          saveEditCallback();
        }
      });
    } else {
      titleArea = document.createElement('span');
      titleArea.textContent = task.title;
      applyStyles(titleArea, {
        color: theme.colors.primary,
        fontSize: '16px',
        textDecoration: task.completed ? 'line-through' : 'none',
        flex: '1',
        marginRight: '10px'
      });
    }

    wrapper.appendChild(checkbox);
    wrapper.appendChild(titleArea);

    const actionWrapper = document.createElement('div');
    applyStyles(actionWrapper, {
      display: 'flex',
      gap: '5px'
    });

    if (this.isEditing) {
      const applyBtn = document.createElement('button');
      applyBtn.textContent = '✓';
      applyStyles(applyBtn, {
        padding: '4px 8px',
        borderRadius: theme.borderRadius,
        backgroundColor: theme.colors.success,
        color: 'white',
        fontSize: '14px',
        cursor: 'pointer',
        border: 'none',
        fontWeight: 'bold'
      });
      applyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        saveEditCallback();
      });
      actionWrapper.appendChild(applyBtn);
    } else {
      const editBtn = document.createElement('button');
      editBtn.textContent = '✎';
      applyStyles(editBtn, {
        padding: '4px 8px',
        borderRadius: theme.borderRadius,
        backgroundColor: '#f39c12',
        color: 'white',
        fontSize: '14px',
        cursor: 'pointer',
        border: 'none'
      });
      editBtn.addEventListener('click', () => {
        this.isEditing = true;
        this.updateView();
        setTimeout(() => {
          const input = this.el.querySelector(`input[type="text"]`);
          if (input) input.focus();
        }, 0);
      });
      actionWrapper.appendChild(editBtn);
    }

    const delBtn = document.createElement('button');
    delBtn.textContent = 'X';
    applyStyles(delBtn, {
      padding: '4px 8px',
      borderRadius: theme.borderRadius,
      backgroundColor: theme.colors.danger,
      color: 'white',
      fontSize: '14px',
      cursor: 'pointer',
      border: 'none',
      fontWeight: 'bold'
    });

    delBtn.addEventListener('click', () => {
      controller.deleteTask(task.id, task.title);
    });

    actionWrapper.appendChild(delBtn);

    this.el.appendChild(wrapper);
    this.el.appendChild(actionWrapper);
  }
}