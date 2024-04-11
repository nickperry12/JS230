function startCounting() {
  let num = 0;

  return setInterval(() => {
    num += 1;
    console.log(num);
  }, 1000);
}

function stopCounting(id) {
  clearInterval(id);
}