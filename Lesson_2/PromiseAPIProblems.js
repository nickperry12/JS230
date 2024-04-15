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

function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Data loaded");
      } else {
        reject("Network error");
      }
    }, 1000);
  });
}

Promise.all([flakyService(), loadData()])
  .then((success) => console.log(success))
  .catch(() => console.error("One or more operations failed."));

// 2

const firstResource = new Promise((resolve) =>
  setTimeout(() => resolve("First resource loaded"), 500)
);
const secondResource = new Promise((resolve) =>
  setTimeout(() => resolve("Second resource loaded"), 1000)
);

Promise.race([firstResource, secondResource])
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

// 3

const services = [flakyService(), flakyService(), flakyService()];

function allSettled(collection) {
  Promise.allSettled(collection).then((results) => {
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(
          `Service ${index + 1} was ${result.status} with message: ${result.value}.`
        );
      } else if (result.status === "rejected") {
        console.error(
          `Service ${index + 1} was ${result.status} with error: ${result.reason}.`
        );
      }
    })
  })
}

allSettled(services);

// 4

function loadData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // loadData always resolves this time
      resolve("Data loaded");
    }, 1000);
  });
}

const primaryOperation = flakyService();
const fallbackOperation = loadData();

Promise.any([primaryOperation, fallbackOperation])
  .then((success) => console.log(success));

// 5

function loadMultipleResources(urls) {
  let fetchedUrls = urls.map(url => {
    return fetch(url)
             .then((success) => success.json())
             .catch(() => "Failed to fetch");
  });
  return Promise.allSettled(fetchedUrls);
}

loadMultipleResources([
  "https://jsonplaceholder.typicode.com/todos/1",
  "invalidUrl",
]).then((results) => {
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log("Fetched data:", result.value);
    } else {
      console.error(result.reason);
    }
  });
});

// Fetched data: {userId: 1, id: 1, title: 'delectus aut autem', completed: false }
// Fetched data: Failed to fetch