// Write a randomizer function that accepts n callbacks and calls each callback
// at some random point in time between now and 2 * n seconds from now. For
// instance, if the caller provides 5 callbacks, the function should run them
// all sometime within 10 seconds.

// While running, randomizer should log the elapsed time every second: 1, 2, 3,
// ..., 2 * n.

/*
P:

We want to create a function that accepts any number of callbacks, and runs each
callback at some random point in time between now and 2 * n seconds from now.
For example, if the caller provides 5 callbacks, the function should run them
of them at sometime within 10 seconds.

The randomizer should log the elapsed time every second.

-- Modeling:

If we want to log the elapsed time, we should use `setInterval`, and log
a number every second that passes. When that number is equal to the size
of the given array of callbacks, the interval should terminate.

To get a random time between now and 2 * n seconds:

Randomize a number between 0 and 1
=> E.g., 0.57 => Multiply this (2 * n) and add 1 and then round to floor




*/

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(...args) {
  let len = args.length;
  let counter = 0;
  let endSeconds = len * 2;

  let repeat = setInterval(() => {
    counter += 1;
    console.log(counter);

    if (counter === endSeconds) {
      clearInterval(repeat);
    }
  }, 1000);

  args.forEach(callback => {
    let time = getRandomTime(endSeconds);
    setTimeout(() => {
      callback();
    }, time)
  });
}

function getRandomTime(n) {
  return Math.floor(Math.random() * n + 1) * 1000;
}

randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6