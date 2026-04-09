import { BaseComponent } from "../components/BaseComponent.js";
import { applyStyles, theme } from "../utils/theme.js";
import { debounce } from "../utils/helpers.js";

export class ArchivePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.searchQuery = '';
  }

  render() {
    const el = document.createElement('div');
    applyStyles(el, {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      width: '100%',
      maxWidth: '500px',
      margin: '0 auto',
      alignItems: 'center'
    });

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Поиск...';
    applyStyles(searchInput, {
      width: '100%',
      padding: '10px',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: theme.borderRadius,
      backgroundColor: theme.colors.primary,
      color: theme.colors.textDark,
      boxSizing: 'border-box',
      marginBottom: '10px',
      marginTop: '20px'
    });

    const listContainer = document.createElement('div');
    applyStyles(listContainer, {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    });

    const performSearch = debounce((query) => {
      this.searchQuery = query.toLowerCase();
      listContainer.innerHTML = '';
      this.renderTasks(listContainer);
    }, 500);

    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });

    el.appendChild(searchInput);
    el.appendChild(listContainer);

    this.renderTasks(listContainer);

    this.unsubscribe = this.props.store.subscribe(() => {
      listContainer.innerHTML = '';
      this.renderTasks(listContainer);
    });

    return el;
  }

  renderTasks(container) {
    const state = this.props.store.getState();
    const tasks = state.tasks || [];
    
    const deletedTasks = tasks.filter(t => t.deleted);
    const filteredTasks = deletedTasks.filter(t => 
      t.title.toLowerCase().includes(this.searchQuery)
    );

    if (filteredTasks.length === 0) {
      const placeholder = document.createElement('div');
      placeholder.textContent = this.searchQuery ? 'Ничего не найдено.' : 'Архив пуст.';
      applyStyles(placeholder, { color: theme.colors.border, textAlign: 'center' });
      container.appendChild(placeholder);
      return;
    }

    filteredTasks.forEach(task => {
      const row = document.createElement('div');
      applyStyles(row, {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius
      });

      const title = document.createElement('span');
      title.textContent = task.title;
      applyStyles(title, {
        color: theme.colors.primary,
        fontSize: '16px',
        textDecoration: task.completed ? 'line-through' : 'none'
      });

      const restoreBtn = document.createElement('button');
      restoreBtn.textContent = '↻';
      applyStyles(restoreBtn, {
        padding: '4px 8px',
        borderRadius: theme.borderRadius,
        backgroundColor: theme.colors.success,
        color: 'white',
        fontSize: '14px',
        cursor: 'pointer',
        border: 'none',
        fontWeight: 'bold',
        marginLeft: '10px'
      });
      restoreBtn.addEventListener('click', () => {
        this.props.controller.restoreTask(task.id, task.title);
      });

      row.appendChild(title);
      row.appendChild(restoreBtn);
      container.appendChild(row);
    });
  }

  unmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    super.unmount();
  }
}
