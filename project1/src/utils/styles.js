export function addStyles(styles) {
  const style = document.createElement('style');
  style.textContent = styles;
  document.head.appendChild(style);
}

export const globalStyles = `
  body {
    background-color: #282828;
    display: flex;
    justify-content: center;
    padding: 20px;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
  }

  .task-form {
    display: flex;
    margin-bottom: 20px;
    margin-top: 20px;
    width: 300px;
    justify-content: center;
  }

  .task-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
  }

  .task-btn {
    padding: 8px 16px;
    margin-left: 10px;
    border-radius: 4px;
    background-color: #ffffff;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: black;
  }

  .task-btn:hover {
    background-color: #d2d2d2;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
  }

  .task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #383838;
    border-radius: 4px;

  }

  .task-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .task-title {
    color: white;
    font-size: 16px;
  }

  .task-title.completed {
    text-decoration: line-through;
  }

  .task-checkbox {
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: #00da07;
  }

  .task-item button {
    padding: 4px 8px;
    border-radius: 4px;
    background-color: #ff0000;
    color: white;
    font-size: 16px;
  }
`;