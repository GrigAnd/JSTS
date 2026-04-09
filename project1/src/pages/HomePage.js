import { BaseComponent } from "../components/BaseComponent.js";
import { List } from "../components/List.js";
import { applyStyles, theme } from "../utils/theme.js";
import { debounce } from "../utils/helpers.js";

export class HomePage extends BaseComponent {
  constructor(props) {
    super(props);
    this.list = new List(this.props);
  }

  render() {
    const el = document.createElement('div');
    applyStyles(el, {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center'
    });

    const topBar = document.createElement('div');
    applyStyles(topBar, {
      display: 'flex',
      gap: '10px',
      width: '100%',
      maxWidth: '500px',
      marginTop: '20px',
      marginBottom: '20px',
      alignItems: 'center'
    });

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Поиск';
    applyStyles(searchInput, {
      flex: '1',
      padding: '10px',
      border: `1px solid ${theme.colors.border}`,
      borderRadius: theme.borderRadius,
      backgroundColor: theme.colors.primary,
      color: theme.colors.textDark,
      boxSizing: 'border-box'
    });

    const performSearch = debounce((query) => {
      this.list.setSearchQuery(query);
    }, 500);

    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });

    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.title = 'Добавить задачу';
    applyStyles(plusBtn, {
      width: '40px',
      height: '40px',
      borderRadius: theme.borderRadius,
      backgroundColor: theme.colors.success,
      color: 'white',
      fontSize: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      paddingBottom: '4px'
    });

    plusBtn.addEventListener('click', () => {
      this.list.showDraft();
    });

    topBar.appendChild(searchInput);
    topBar.appendChild(plusBtn);
    el.appendChild(topBar);

    this.list.mount(el);

    return el;
  }

  unmount() {
    this.list.unmount();
    super.unmount();
  }
}
