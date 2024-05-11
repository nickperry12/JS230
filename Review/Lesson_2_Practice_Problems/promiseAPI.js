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

// 1. Use Promise.all() to execute two instances of the flakyService function
//    and the loadData function concurrently. Log the results if all the
//    operations are successful. Handle the situation where one or more of the
//    promises might fail by logging "One or more operations failed".

Promise.all([flakyService(), loadData()])
  .then(value => console.log(value))
  .catch(error => console.error('One or more operations failed'));

// 2. Imagine you have two promises, firstResource and secondResource, that
//    resolve after different intervals. Use Promise.race() to log the value of
//    whichever promise resolves first.

const firstResource = new Promise((resolve) =>
  setTimeout(() => resolve("First resource loaded"), 500)
);
const secondResource = new Promise((resolve) =>
  setTimeout(() => resolve("Second resource loaded"), 1000)
);

Promise.race([firstResource, secondResource])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// 3. You have multiple instances of flakyService promises. Implement a strategy
//    using Promise.allSettled() to execute all services but log all the
//    different outcomes, whether fulfilled or rejected.

const services = [flakyService(), flakyService(), flakyService()];

Promise.allSettled(services)
  .then(results => console.log(results));

// 4. Let's say you want to load cached data with loadData as a backup when
//    flakyService fails. Demonstrate how you could use Promise.any() to attempt
//    fetching from flakyService first and, if that fails, to rely on loadData
//    without failing the overall operation.

Promise.any([flakyService(), loadData()])
  .then((success) => console.log(success))
  .catch((err) => console.error(err));

// 5. Implement a helper function loadMultipleResources that takes an array of
//    URLs and fetches them using the fetch API. Use Promise.allSettled() to
//    return an array of fetched responses, regardless of whether some URLs may
//    lead to failure.

function loadMultipleResources(urls) {
  let fetchedUrls = urls.map(url => {
    return fetch(url)
      .then(response => response.json())
      .catch(() => "Failed to fetch.");
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