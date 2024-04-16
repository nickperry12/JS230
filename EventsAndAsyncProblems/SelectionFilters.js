// Given the HTML below, write some JavaScript code that updates the options on
// one dropdown when the selection in the other dropdown changes. For instance,
// when the user chooses an option under Classifications, the items in the
// Animals dropdown should change accordingly. Use the lookup tables below to
// see which animals and classifications go together.

const animalAndClass = {
  Vertebrates: ['Bear', 'Turtle', 'Salmon', 'Whale', 'Ostrich'],
  'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
  'Cold-blooded': ['Salmon', 'Turtle'],
  Mammal: ['Bear', 'Whale'],
  Bird: ['Ostrich']
}

const animals = {
  Bear: ['Vertebrate', 'Warm-blooded', 'Mammal'],
  Turtle: ['Vertebrate', 'Cold-blooded'],
  Whale: ['Vertebrate', 'Warm-blooded', 'Mammal'],
  Salmnon: ['Vertebrate', 'Cold-blooded'],
  Ostrich: ['Vertebrate', 'Warm-blooded', 'Bird']
}

const animalClassifications = document.querySelector('#animal-classifications');
const animalNames = document.querySelector('#animals');