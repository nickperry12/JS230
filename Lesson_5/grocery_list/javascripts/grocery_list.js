function addNewListItem() {
  let list = document.querySelector('#grocery-list');
  let listItem = document.createElement('li');
  let itemName = getElement('#name').value;
  let quantity = getElement('#quantity').value || '1';

  listItem.appendChild(document.createTextNode(`${quantity} ${itemName}`));
  list.appendChild(listItem);
}

function getElement(selector) {
  return document.querySelector(selector)
}

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');

  form.addEventListener('submit', event => {
    event.preventDefault();
    let itemName = getElement('#name').value;

    if (!itemName) {
      alert('Please enter an item.');
      return;
    } else {
      console.log('added');
      addNewListItem();
      form.reset();
    }
  });
});