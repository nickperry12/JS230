// Bold Element & Custom

// Implement a function that makes an element bold and allows the user of the
// function to optionally do something else with it.
// let sectionElement = document.querySelector('section');

// function makeBold(element) {
//   element.style.fontWeight = 'bold';
//   let boldEvent = new CustomEvent('build');

//   element.dispatchEvent(boldEvent);
// }

// sectionElement.addEventListener("build", event => {
//   event.currentTarget.classList.add('highlight');
// });

// makeBold(sectionElement);

// sectionElement.classList.contains('highlight');
// // true
// sectionElement.style.fontWeight;
// // "bold"
const bolded = new CustomEvent('bolded', { bubbles: true });

function makeBold(element, callback) {
  element.style.fontWeight = 'bold';

  if (callback && typeof callback === 'function') {
    callback(element);
  }

  element.dispatchEvent(bolded);
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is loaded!');
  
  document.addEventListener('click', event => {
    let section = document.querySelector('section');
  
    if (event.target.tagName === 'SECTION') {
      makeBold(section, (elem) => {
        elem.classList.add('highlight');
      });
    }
  });
})