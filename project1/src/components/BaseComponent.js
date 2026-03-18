export class BaseComponent {
  constructor(props) {
    this.props = props;
    this.el = null;
  }

  render() {
    return document.createElement('div');
  }

  mount(parent) {
    this.el = this.render();
    parent.appendChild(this.el);
  }

  unmount() {
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
      this.el = null;
    }
  }
}