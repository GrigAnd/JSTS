import { BaseComponent } from "./BaseComponent.js";
import { Router } from "../router/Router.js";
import { HomePage } from "../pages/HomePage.js";
import { LogPage } from "../pages/LogPage.js";
import { ArchivePage } from "../pages/ArchivePage.js";
import { theme, applyStyles } from "../utils/theme.js";

export class App extends BaseComponent {
  constructor(props) {
    super(props);
    this.router = null;
    this.navLinks = [];
  }

  render() {
    const el = document.createElement('div');
    applyStyles(el, {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      backgroundColor: theme.colors.background,
      minHeight: '100vh',
      color: theme.colors.text
    });

    const nav = document.createElement('nav');
    applyStyles(nav, {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      padding: '20px',
      backgroundColor: theme.colors.surface,
      borderBottom: `1px solid ${theme.colors.border}`,
      marginBottom: '20px'
    });

    const links = [
      { text: 'Главная', path: '/' },
      { text: 'Архив', path: '/archive' },
      { text: 'Лог', path: '/log' }
    ];

    links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.path;
      a.textContent = link.text;
      a.setAttribute('data-link', '');
      a.setAttribute('data-path', link.path);
      applyStyles(a, {
        color: theme.colors.primary,
        textDecoration: 'none',
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '5px 15px',
        borderRadius: theme.borderRadius
      });
      this.navLinks.push(a);
      nav.appendChild(a);
    });

    const container = document.createElement('div');
    applyStyles(container, {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 20px',
      boxSizing: 'border-box'
    });

    el.appendChild(nav);
    el.appendChild(container);

    const routes = {
      '/': (props) => new HomePage(props),
      '/archive': (props) => new ArchivePage(props),
      '/log': (props) => new LogPage(props)
    };

    this.router = new Router(routes, container, {
      ...this.props,
      onRouteChanged: (path) => this.updateActiveNav(path)
    });

    return el;
  }

  updateActiveNav(currentPath) {
    this.navLinks.forEach(a => {
      if (a.getAttribute('data-path') === currentPath) {
        a.style.color = theme.colors.success;
        a.style.backgroundColor = 'rgba(255,255,255,0.1)';
      } else {
        a.style.color = theme.colors.primary;
        a.style.backgroundColor = 'transparent';
      }
    });
  }
}
