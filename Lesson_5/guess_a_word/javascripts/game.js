document.addEventListener('DOMContentLoaded', () => {
  let letters = document.querySelector('#spaces');
  let message = document.querySelector('#message');
  let guesses = document.querySelector('#guesses');
  let apples = document.querySelector('#apples');
  let replay = document.querySelector('#replay');

  let randomWord = (function() {
    let words = ['apple', 'banana', 'orange', 'pear'];
    let usedWords = [];
  
    return function() {
      if (words.length === usedWords.length) { return undefined };
  
      let max = words.length;
      let idx = Math.floor(Math.random() * max); 
      let word = words[idx];
    
      if (usedWords.includes(word)) {
        return randomWord();
      } else {
        usedWords.push(word);
        return word;
      }
    }
  })();
  
  let Game = {
    init() {
      this.reset();
      this.correctGuesses = 0;
      this.incorrectGuesses = 0;
      this.guessedLetters = [];
      this.totalWrongGuesses = 6;
      this.word = randomWord();
      this.lettersGuessed = [];
      if (!this.word) {
        message.textContent = "Sorry, I've run out of words!";
        return this;
      }
      this.word = this.word.split('');
      this.createBlanks();
      this.bindEvents();
      return this;
    },
    reset() {
      this.emptyGuesses;
      replay.classList.remove('visible');
      this.addApples();
      message.textContent = '';
      this.setClass();
    },
    addApples() {
      apples.classList.remove(...apples.classList);
      apples.classList.add("guess_" + this.incorrect);
    },
    createBlanks() {
      let spaces = (new Array(this.word.length + 1)).join('<span></span>');
      let spans = document.querySelectorAll('span');

      spans.forEach(span => {
        span.parentNode.removeChild(span);
      });

      letters.insertAdjacentHTML('beforeend', spaces);
      this.spaces = document.querySelectorAll("#spaces span");
    },
    emptyGuesses() {
      let spans = document.querySelectorAll('span');
      spans.forEach(span => {
        span.parentNode.removeChild(span);
      });
    },
    displayMessage(text) {
      message.textContent = text;
    },
    getMatchingIndices(letter) {
      let indices = [];

      this.word.forEach((let, idx) => {
        if (let === letter) {
          indices.push(idx);
        }
      })

      return indices;
    },
    duplicateGuess(letter) {
      let duplicate = this.lettersGuessed.indexOf(letter) !== -1;

      if (!duplicate) { this.lettersGuessed.push(letter); }

      return duplicate;
    },
    displayMessage(message) {
      document.querySelector('p#message').textContent = message;
    },
    renderCorrectGuesses(indices) {
      for (let i = 0; i < indices.length; i++) {
        let idx = indices[i];
        document.querySelectorAll('span')[idx].textContent = this.word[idx];
      }
    },
    removeApple() {
      apples.classList.remove(...apples.classList);
      apples.classList.add("guess_" + this.incorrectGuesses);
    },
    processGuess(event) {
      let alphas = [...'abcdefghijklmnopqrstuvwxyz'];

      if (alphas.includes(event.key)) {
        let letter = event.key;
        this.guessedLetters.push(letter);

        if (this.duplicateGuess(letter)) { return; }

        if (this.word.includes(letter)) {
          let indices = this.getMatchingIndices(letter);
          this.correctGuesses += indices.length;
          this.renderCorrectGuesses(indices);
        } else {
          this.renderIncorrectGuess(letter);
          this.incorrectGuesses += 1;
          this.removeApple();
        }
      }

      if (this.correctGuesses === this.word.length) {
        this.win();
      } else if (this.incorrectGuesses === this.totalWrongGuesses) {
        this.loss();
      }
    },
    renderIncorrectGuess(letter) {
      let span = document.createElement('span');
      span.textContent = letter;
      guesses.insertAdjacentElement('beforeend', span);
      this.removeApple();
    },
    setClass(className) {
      if (className) {
        document.querySelector('body').classList.add(className);
      } else {
        document.querySelector('body').classList.remove('win', 'lose');
      }
    },
    win() {
      this.displayMessage('You win!');
      this.setClass('win');
      replay.classList.add('visible');
      document.removeEventListener('keyup', this.processGuessHandler);
    },
    loss() {
      this.displayMessage("Sorry, you've run out of guesses!");
      this.setClass('lose');
      replay.classList.add('visible');
      document.removeEventListener('key', this.processGuessHandler);
    },
    bindEvents() {
      this.processGuessHandler = (e) => this.processGuess(e);
      document.addEventListener('keyup', this.processGuessHandler);
    }
  };

  Object.create(Game).init();

  replay.addEventListener("click", function(e) {
    e.preventDefault();
    Object.create(Game).init();
  });
});
