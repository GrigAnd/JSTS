function myQuerySelectorAll(selector) {
  const result = [];

  // примитивный самописный
  // function matcher(node, select) {
  //   if (!node.tagName) return false;

  //   if (select === "*") {
  //     return true;
  //   } else if (select.startsWith("#")) {
  //     return node.id === select.slice(1);
  //   } else if (select.startsWith(".")) {
  //     return node.classList.contains(select.slice(1));
  //   } else {
  //     return node.tagName.toLowerCase() === select.toLowerCase();
  //   }
  // }

  function matcher(node, select) {
    if (node.matches) {
      return node.matches(select); // используем встроенный метод браузера
    } else {
      return false;
    }
  }

  function dfs(node) {
    if (matcher(node, selector)) {
      result.push(node);
    }
    for (const child of node.children) {
      dfs(child);
    }
  }

  dfs(document);

  return result;
}

module.exports = myQuerySelectorAll;