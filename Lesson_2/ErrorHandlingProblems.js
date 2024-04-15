// 1
function flakyService() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Operation successful");
    } else {
      reject("Operation failed");
    }
  });
}

flakyService()
  .then((result) => console.log(result))
  .catch((error) => console.error("An error occured:", error))
  .finally(() => {
    console.log("Cleaning up resources...")
  });

// 2

function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject({ error: "User not found" }), 500);
  });
}

fetchUserData()
  .then((result) => console.log(result))
  .catch((error) => console.error("An error occurred:", error.error))
  .finally(() => console.log("Fetching complete."));

// 3

function retryOperation(operationFunc) {
  let attempts = 0;
  function attempt() {
    return operationFunc().catch((error) => {
      if (attempts < 2) {
        attempts += 1;
        console.log(`Operation failed. Retrying, attempt #${attempts}...`);
        return attempt();
      } else {
        throw error;
      }
    })
  }

  return attempt().catch(() => console.error("Operation failed!"));
}

// Example usage:
retryOperation(
  () =>
    new Promise((resolve, reject) =>
      Math.random() > 0.33
        ? resolve("Success!")
        : reject(new Error("Fail!"))
    )
);

// 4

function mockAsyncOp() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Operation succeeded");
      } else {
        reject("Operation failed");
      }
    }, 1000);
  });
}

mockAsyncOp()
  .then((success) => console.log(success))
  .catch((error) => console.error("Error:", error))
  .finally(() => console.log("Operation attempted."));

// 5

function loadData() {
  return new Promise((resolve, reject) => {
    let num = Math.random();
    let dataLoaded = num < 0.5;

    setTimeout(() => {
      if (dataLoaded) {
        resolve("Data Loaded.");
      } else {
        reject("Network error.");
      }
    }, 2000);
  })
  .catch((error) => {
    console.error(`There was an error: ${error}. Attempting to recover...`);
    return Promise.resolve('Using cached data.');
  });
}

loadData.then((success) => console.log(success))