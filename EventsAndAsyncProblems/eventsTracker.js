/*
Implement a function that tracks events on a web page by wrapping a callback
function in a function that adds each event to a tracker object before invoking
the callback. In other words, your function should take a callback function as
an argument and return a new function that:

Records the event, if the specific event hasn't been recorded before.
Executes the original callback function.

Assumptions

Assume that the user clicks the elements in the following order: div#blue,
div#red, div#orange, and div#green.

Use the "click" event listeners for the four elements:
*/
document.addEventListener('DOMContentLoaded', () => {
  const divRed = document.querySelector('#red');
  const divBlue = document.querySelector('#blue');
  const divGreen = document.querySelector('#green');
  const divOrange = document.querySelector('#orange');

  const tracker = (() => {
    let events = [];
    let elements = [];

    return {
      list() {
        return events.slice();
      },
      elements() {
        return elements;
      },
      add(event) {
        events.push(event);
      },
      clear() {
        events = [];
        return events.length;
      }
    }
  })();

  function track(callback) {
    function isEventTracked(events, event) {
      return events.includes(event);
    }

    return event => {
      if (!isEventTracked(tracker.list(), event)) {
        tracker.add(event);
      }

      callback(event);
    }
  }

  divRed.addEventListener('click', track(event => {
    document.body.style.background = 'red';
    console.log(tracker.list());
  }));
  
  divBlue.addEventListener('click', track(event => {
    event.stopPropagation();
    document.body.style.background = 'blue';
    console.log(tracker.list());
  }));
  
  divOrange.addEventListener('click', track(event => {
    document.body.style.background = 'orange';
    console.log(tracker.list());
  }));
  
  divGreen.addEventListener('click', track(event => {
    document.body.style.background = 'green';
    console.log(tracker.list());
  }));
})
