// 1. Convert the downloadFilePromise function you saw previously to an
//    asynchronous function named asyncDownloadFile. Utilize await to pause
//    execution until the file download completes before logging the success
//    message.

async function asyncDownloadFile() {
  console.log('Downloading file...');
  let num = Math.random();
  try {
    let message = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (num > 0.1) {
          resolve('Download successful!');
        } else {
          reject('Download failed.');
        }
      }, 2000);
    });
    console.log(message);
  } catch (error) {
    console.error(error);
  }
}

// asyncDownloadFile();

// 2. Rewrite the loadData function using async/await, making sure to handle
//    both the success scenario (console.log) and the error scenario
//    (console.error).

async function loadData() {
  let num = Math.floor(Math.random * 100) + 1;

  try {
    let result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (num >= 50) {
          resolve('Data loaded!');
        } else {
          reject('Network error!');
        }
      }, 3000);
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// loadData();

// 3. Create an async function fetchResource that receives a URL, attempts to
//    fetch the resource, and logs the JSON response. If an error occurs during
//    fetching, the function should log "Failed to load resource". Regardless of
//    success or failure, confirm that the resource was attempted by logging
//    "Resource fetch attempt made".

async function fetchResource(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
  } catch {
    console.error('Failed to load resource.');
  } finally {
    console.log('Resource fetch attempt made.');
  }
}

fetchResource("https://jsonplaceholder.typicode.com/todos/1");
fetchResource('invalidUrl');