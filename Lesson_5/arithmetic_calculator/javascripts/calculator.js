

document.addEventListener('DOMContentLoaded', () => {
  let operator = document.querySelector('#operator').value;
  let form = document.querySelector('form');
  let resultEle = document.querySelector('#result');
  let fieldset = document.querySelector('fieldset');
  let firstNum = document.getElementById('first-number').value;
  let secondNum = document.getElementById('second-number').value;
  
  fieldset.addEventListener('change', event => {
    event.preventDefault();
    let ele = event.target;

    if (ele.tagName === 'INPUT' && ele.id === 'first-number') {
      firstNum = ele.value;
    } else if (ele.tagName === 'INPUT' && ele.id === 'second-number') {
      secondNum = ele.value;
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    console.log('hi');
  });
});