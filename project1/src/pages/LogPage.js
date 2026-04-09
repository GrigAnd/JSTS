import { BaseComponent } from "../components/BaseComponent.js";
import { applyStyles, theme } from "../utils/theme.js";

export class LogPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
  }

  render() {
    const el = document.createElement('div');
    applyStyles(el, {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto'
    });

    this.renderLogs(el);

    this.unsubscribe = this.props.store.subscribe(() => {
      el.innerHTML = '';
      this.renderLogs(el);
    });

    return el;
  }

  renderLogs(container) {
    const state = this.props.store.getState();
    const logs = state.logs || [];

    if (logs.length === 0) {
      const placeholder = document.createElement('div');
      placeholder.textContent = 'Пусто';
      applyStyles(placeholder, { color: theme.colors.border, textAlign: 'center' });
      container.appendChild(placeholder);
      return;
    }

    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Очистить';
    applyStyles(clearBtn, {
      padding: '8px 16px',
      marginBottom: '10px',
      borderRadius: theme.borderRadius,
      backgroundColor: theme.colors.danger,
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      alignSelf: 'flex-end'
    });
    clearBtn.addEventListener('click', () => {
      this.props.controller.clearLog();
    });
    container.appendChild(clearBtn);

    [...logs].reverse().forEach(log => {
      const row = document.createElement('div');
      applyStyles(row, {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius
      });

      const msg = document.createElement('span');
      msg.textContent = log.msg;
      
      const time = document.createElement('span');
      const d = new Date(log.time);
      time.textContent = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
      applyStyles(time, { color: theme.colors.border, fontSize: '12px' });

      row.appendChild(msg);
      row.appendChild(time);
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
