// Reverse Engineer

// Without changing the behavior of the following code, remove the call to
// event.stopPropagation and refactor the result.

document.querySelector('html').addEventListener('click', event => {
  // document.querySelector('#container').style = 'display: none';
  let container = document.querySelector('#container');
  container.style = 'display: none';

  if (!event.target.contains(container)) {
    container.style = 'display: block';
  }
});

// document.querySelector('#container').addEventListener('click', event => {
//   document.querySelector('#container').style = "display: block";
// });