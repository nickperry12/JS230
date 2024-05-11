// 1. Rewrite the downloadFile callback function from the last practice problem
//    as a new promise-based function called downloadFilePromise. Instead of
//    using a callback, it should return a promise that resolves with the
//    message "Download complete!" after a delay.

let downloadFilePromise = new Promise((resolve, reject) => {
  let num = Math.random();
  console.log('Downlaoding file...');
  setTimeout(() => {
    if (num < 0.5) {
      resolve('File successfully downloaded!');
    } else {
      reject('Corrupt data. Cancelling download...');
    }
  }, 1500)
})
  .then(success => console.log(success))
  .catch(err => console.error(err))
  .finally(() => console.log('Cleaning up resources...'));

// 3. Create a promise called flakyService that simulates a service that
//    sometimes fails. The promise should resolve with "Operation successful" or
//    reject with "Operation failed" randomly. Use .then() for a successful
//    operation log and .catch() for logging a failed operation.

let flakyService = new Promise((resolve, reject) => {
  let num = Math.random();

  if (num > 0.5) {
    resolve('Operation successful!');
  } else {
    reject('Operation failed.');
  }
})
  .then(success => console.log(success))
  .catch(error => console.error('There was an issue:', error))
  .finally(() => console.log('Cleaning up resources...'));

// 4. Imagine a situation where you need to clean up resources (e.g., close a
//    file) whether an operation succeeds or fails. Create a promise that
//    resolves with "Operation complete" and demonstrate how to perform cleanup
//    after the operation completes by using .finally().

let operationPromise = new Promise((resolve, reject) => {
  let num = Math.floor(Math.random() * 100) + 1;

  setTimeout(() => {
    if (num < 50) {
      resolve('Operation complete!');
    } else {
      reject('Operation failed');
    }
  }, 10000);
})
  .then(success => console.log(success))
  .catch(error => console.error('There was an error:', error))
  .finally(() => console.log('Cleaning up resources.'));

// 5. Practice chaining promises by creating a promise chain that involves three
//    promises. The first promise should resolve with a number, then the chain
//    should double the number and add 5 in successive .then() calls. Log the
//    result after the final operation.

let chainPromise = new Promise((resolve, reject) => {
  resolve(10);
})
  .then(val => val * 2)
  .then(val => val + 5)
  .then(val => console.log(val + 5));