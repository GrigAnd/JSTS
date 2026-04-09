export const theme = {
  colors: {
    background: '#282828',
    surface: '#383838',
    primary: '#ffffff',
    text: '#ffffff',
    textDark: '#000000',
    border: '#ccc',
    danger: '#ff0000',
    success: '#00da07',
    hover: '#d2d2d2'
  },
  spacing: {
    padding: '20px',
    smallPadding: '10px',
    tinyPadding: '4px 8px'
  },
  borderRadius: '4px',
  fontFamily: 'Arial, sans-serif'
};

export function applyStyles(element, stylesMap) {
  for (const [key, value] of Object.entries(stylesMap)) {
    if (element.style.hasOwnProperty(key) || key in element.style) {
      element.style[key] = value;
    }
  }
}
