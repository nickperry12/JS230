// 1

function downloadFilePromise() {
  return new Promise((resolve, reject) => {
    console.log("Downloading file...")
    setTimeout(() => {
      resolve("Download complete!");
    }, 1500)
  });
}

async function asyncDownloadFile() {
  try {
    console.log("Downloading file...")
    let message = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Download complete!");
      }, 2000);
    })
      console.log(message);
  } catch(error) {
    console.error("Oops, there was an error:", error);
  }
}

// 2

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

async function asyncLoadData() {
  let dataLoaded = Math.random() > 0.5;
  try {
    let success = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (dataLoaded) {
          resolve("Success -- Data loaded!");
        } else {
          reject("Network error.")
        }
      }, 2000);
    });
    console.log(success);
  } catch(error) {
    console.error("There was an error:", error);
  }
}

// 3

async function fetchResource(url) {
  try {
    let fetchedUrl = await fetch(url);
    let data = await fetchedUrl.json();
    console.log(data);
  } catch(error) {
    console.error("Failed to load resource");
  } finally {
    console.log("Resoruce fetch attempt made.");
  }
}

// 4

async function fetchUserProfile(id) {
  try {
    let userProfile = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!userProfile.ok) {
      throw new Error("User profile not found.");
    }
    let userData = await userProfile.json();
    console.log(userData);
  } catch(error) {
    console.error("Error fetching profile:", error);
  } 
  
  try {
    let userPosts = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
    if (!userPosts.ok) {
      throw new Error("User posts not found.");
    }
    let postData = await userPosts.json();
    console.log(postData);
  } catch(error) {
    console.error("Error fetching posts:", error);
  } 
  
  try {
    let userTodos = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`);
    if (!userTodos.ok) {
      throw new Error("User todos not found.");
    }
    let todoData = await userTodos.json();
    console.log(todoData);
  } catch(error) {
    console.error("Error fetching todos:", error);
  }
}