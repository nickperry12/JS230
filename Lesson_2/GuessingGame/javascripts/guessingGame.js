document.addEventListener('DOMContentLoaded', event => {
  let answer = Math.floor(Math.random() * 100) + 1;
  let form = document.querySelector('form');
  let input = document.querySelector('#guess');
  let newGameBtn = document.querySelector('a');
  let parag = document.querySelector('p');
  let counter = 0;

  form.addEventListener('submit', event => {
    event.preventDefault();
    let guess = parseInt(input.value, 10);
    let message;

    if (guess < answer) {
      message = `My number is higher than ${guess}`;
      counter += 1;
      input.value = '';
    } else if (guess > answer) {
      message = `My number is lower than ${guess}`;
      counter += 1;
      input.value = '';
    } else if (guess === answer) {
      message = `You guessed it! It took you ${counter} guesses.`;
    }

    parag.textContent = message;
  });

  newGameBtn.addEventListener('click', event => {
    event.preventDefault();
    answer = Math.floor(Math.random() * 100) + 1;
    parag.textContent = 'Guess a number from 1 to 100';
    input.value = '';
    counter = 0;
  });
});