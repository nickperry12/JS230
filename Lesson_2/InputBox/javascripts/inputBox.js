let toggleCursorInterval;

document.addEventListener('DOMContentLoaded', event => {
  let textField = document.querySelector('.text-field');

  textField.addEventListener('click', event => {
    event.stopPropagation();
    textField.classList.add('focused');

    if (!toggleCursorInterval) {
      toggleCursorInterval = setInterval(() => {
        textField.classList.toggle('cursor');
      }, 500);
    }
  });

  document.addEventListener('keydown', event => {
    if (textField.classList.contains('focused')) {
      let content = document.querySelector('.content');
      if (event.key === 'Backspace') {
        let endIndex = content.textContent.length - 1;
        content.textContent = content.textContent.slice(0, endIndex);
      } else {
        content.textContent += event.key;
      }
    }
  })

  document.addEventListener('click', event => {
    clearInterval(toggleCursorInterval);
    textField.classList.remove('focused');
    textField.classList.remove('cursor');
    toggleCursorInterval = null;
  });
});