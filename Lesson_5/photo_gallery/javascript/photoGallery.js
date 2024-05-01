function switchActivePhoto(event) {
  let currentActive = document.querySelector('.active');
  let newActive = event.target;
  let displayImg = document.getElementById('display');

  currentActive.classList.remove('active');
  newActive.classList.add('active');
  displayImg.src = newActive.src;
}

document.addEventListener('DOMContentLoaded', () => {
  let list = document.querySelector('ul');

  list.addEventListener('click', event => {
    if (event.target.tagName === 'IMG') {
      switchActivePhoto(event);
    }
  });
});