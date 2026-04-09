export class Router {
  constructor(routes, container, props) {
    this.routes = routes;
    this.container = container;
    this.props = props;
    this.currentView = null;

    window.addEventListener('popstate', () => {
      this.route(window.location.pathname);
    });

    document.body.addEventListener('click', e => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        this.navigate(e.target.getAttribute('href'));
      }
    });

    this.route(window.location.pathname);
  }

  navigate(path) {
    if (window.location.pathname === path) return;
    window.history.pushState(null, '', path);
    this.route(path);
  }

  route(path) {
    if (this.currentView) {
      this.currentView.unmount();
    }

    const page = this.routes[path] || this.routes['/'];
    if (page) {
      this.currentView = page(this.props);
      this.currentView.mount(this.container);
    } else {
      this.container.innerHTML = '<h2>404</h2>';
    }

    if (this.props.onRouteChanged) {
      this.props.onRouteChanged(path);
    }
  }
}
