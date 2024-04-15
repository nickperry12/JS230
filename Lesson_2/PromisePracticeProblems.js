// 1
function downloadFilePromise() {
  return new Promise((resolve, reject) => {
    console.log("Downloading file...")
    setTimeout(() => {
      resolve("Download complete!");
    }, 1500)
  });
}

// 2
function processDataPromise(data) {
  return new Promise((resolve, reject) => {
    let processedData = data.map(num => num * 2);
    setTimeout(() => {
      resolve(processedData);
    }, 1000);
  });
}

processDataPromise([1, 2, 3]).then((processedNumbers) => {
  console.log(processedNumbers);
  // After 1 second, logs: [2, 4, 6]
});

// 3
function randomizer() {
  return Math.floor(Math.random() * 2) + 1;
}

function flakyService() {
  return new Promise((resolve, reject) => {
    let num = randomizer();

    if (num === 1) {
      resolve("Operation successful!");
    } else if (num === 2) {
      reject("Operation failed.");
    }
  });
}

flakyService().then(successMsg => console.log(successMsg))
              .catch(errorMsg => console.error(errorMsg));

// 4
function operationPromise() {
  return new Promise((resolve, reject) => {
    console.log("Operation beginning...");
    setTimeout(() => {
      resolve("Operation complete.");
    }, 1500);
  })
}

operationPromise().then(console.log)
                  .finally(() => {
                    console.log("Cleaning up resources...");
                  });

// 5
Promise.resolve(7)
  .then((number) => number * 2)
  .then((number) => number + 5)
  .then((result) => console.log(result));
// Logs: 19