// Given the HTML below, write some JavaScript code that updates the options on
// one dropdown when the selection in the other dropdown changes. For instance,
// when the user chooses an option under Classifications, the items in the
// Animals dropdown should change accordingly. Use the lookup tables below to
// see which animals and classifications go together.
const animalAndClass = {
  Vertebrate: ['Bear', 'Turtle', 'Salmon', 'Whale', 'Ostrich'],
  'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
  'Cold-blooded': ['Salmon', 'Turtle'],
  Mammal: ['Bear', 'Whale'],
  Bird: ['Ostrich']
}

const animals = {
  Bear: ['Vertebrate', 'Warm-blooded', 'Mammal'],
  Turtle: ['Vertebrate', 'Cold-blooded'],
  Whale: ['Vertebrate', 'Warm-blooded', 'Mammal'],
  Salmon: ['Vertebrate', 'Cold-blooded'],
  Ostrich: ['Vertebrate', 'Warm-blooded', 'Bird']
}

const animalClassifications = document.querySelector('#animal-classifications'); // classifications
const animalNames = document.querySelector('#animals'); // animal list
const clearBtn = document.querySelector('#clear');

function addOptions(selectEle, options) {
  options.forEach(option => {
    selectEle.add(new Option(option, option));
  })
}

function removeOptions(selectElement) {
  while (selectElement.options.length > 0) {
    selectElement.remove(0);
  }
}

function setDefaults() {
  removeOptions[animalClassifications];
  removeOptions[animalNames];
  
  animalClassifications.add(new Option('Classification', 'Classification'));
  animalNames.add(new Option('Animals', 'Animals'));

  addOptions(animalClassifications, defaultOptions['Classifications']);
  addOptions(animalNames, defaultOptions['Animals']);
}

animalClassifications.addEventListener("change", event => {
  let classification = event.target.value;
  removeOptions(animalNames);
  addOptions(animalNames, animalAndClass[classification]);
});

animalNames.addEventListener("change", event => {
  event.stopPropagation();
  let animal = event.target.value;
  removeOptions(animalClassifications);
  addOptions(animalClassifications, animals[animal]);
});

clearBtn.addEventListener('click', event => {
  event.preventDefault();
  setDefaults();
});