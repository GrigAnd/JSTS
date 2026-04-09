import { BaseComponent } from "./BaseComponent.js";
import { Task } from "./Task.js";
import { applyStyles, theme } from "../utils/theme.js";

export class List extends BaseComponent {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.taskComponents = [];
    this.isDrafting = false;
    this.searchQuery = '';
  }

  setSearchQuery(query) {
    this.searchQuery = query.toLowerCase();
    this.clearTasks();
    this.el.innerHTML = '';
    this.renderTasks(this.el);
  }

  showDraft() {
    this.isDrafting = true;
    this.clearTasks();
    this.el.innerHTML = '';
    this.renderTasks(this.el);
  }

  render() {
    const list = document.createElement('div');
    applyStyles(list, {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      width: '100%',
      maxWidth: '500px'
    });

    this.renderTasks(list);

    this.unsubscribe = this.props.store.subscribe(() => {
      this.clearTasks();
      list.innerHTML = '';
      this.renderTasks(list);
    });

    return list;
  }

  renderTasks(container) {
    if (this.isDrafting) {
      const draftEl = document.createElement('div');
      applyStyles(draftEl, {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius,
        gap: '10px',
        boxSizing: 'border-box'
      });
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Название задачи...';
      applyStyles(input, {
        flex: '1', padding: '4px', fontSize: '16px',
        border: `1px solid ${theme.colors.border}`, borderRadius: '2px'
      });
      const saveBtn = document.createElement('button');
      saveBtn.textContent = '✓';
      applyStyles(saveBtn, {
        padding: '4px 8px', borderRadius: theme.borderRadius,
        backgroundColor: theme.colors.success, color: 'white',
        cursor: 'pointer', border: 'none', fontWeight: 'bold'
      });
      
      const saveDraft = () => {
         if (!this.isDrafting) return;
         const val = input.value.trim();
         this.isDrafting = false;
         if (val) {
           this.props.controller.addTask(val);
         } else {
           this.clearTasks();
           container.innerHTML = '';
           this.renderTasks(container);
         }
      };

      input.addEventListener('keydown', e => { if (e.key === 'Enter') saveDraft(); });
      input.addEventListener('blur', () => { setTimeout(saveDraft, 150); });
      saveBtn.addEventListener('click', saveDraft);

      draftEl.appendChild(input);
      draftEl.appendChild(saveBtn);
      container.appendChild(draftEl);
      
      setTimeout(() => input.focus(), 0);
    }

    const state = this.props.store.getState();
    const tasks = state.tasks || [];
    
    let activeTasks = tasks.filter(t => !t.deleted && !t.completed);
    let completedTasks = tasks.filter(t => !t.deleted && t.completed);
    
    if (this.searchQuery) {
      activeTasks = activeTasks.filter(t => t.title.toLowerCase().includes(this.searchQuery));
      completedTasks = completedTasks.filter(t => t.title.toLowerCase().includes(this.searchQuery));
    }

    activeTasks.forEach(taskData => {
      const task = new Task({ ...this.props, task: taskData });
      task.mount(container);
      this.taskComponents.push(task);
    });

    if (completedTasks.length > 0 && activeTasks.length > 0) {
      const separator = document.createElement('hr');
      applyStyles(separator, {
        width: '100%',
        border: 'none',
        borderTop: `1px solid ${theme.colors.border}`,
        margin: '10px 0'
      });
      container.appendChild(separator);
    }

    if (completedTasks.length > 0 && !this.searchQuery) {
      const clearBtn = document.createElement('button');
      clearBtn.textContent = 'Очистить';
      applyStyles(clearBtn, {
        padding: '4px 12px',
        marginBottom: '10px',
        borderRadius: theme.borderRadius,
        backgroundColor: 'transparent',
        color: theme.colors.border,
        border: `1px solid ${theme.colors.border}`,
        cursor: 'pointer',
        alignSelf: 'flex-end',
        fontSize: '12px'
      });
      clearBtn.addEventListener('click', () => {
        this.props.controller.clearCompleted();
      });
      container.appendChild(clearBtn);
    }

    completedTasks.forEach(taskData => {
      const task = new Task({ ...this.props, task: taskData });
      task.mount(container);
      this.taskComponents.push(task);
    });
  }

  clearTasks() {
    this.taskComponents.forEach(cmp => cmp.unmount());
    this.taskComponents = [];
  }

  unmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.clearTasks();
    super.unmount();
  }
}