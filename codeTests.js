"use strict";

function log(arg) {
  console.log(arg);
}

function setStartAndEnd(arr, start, end) {
  if (start > arr.length) {
    start = arr.length;
  } else if (end > arr.length) {
    end = arr.length;
  }

  return [start, end];
}

function slice(arr, start, end) {
  let slicedArr = [][start, end] = setStartAndEnd(arr, start, end)

  if (start === arr.length || end === 0) {
    return [];
  }
  for (let i = start ; i < end; i++) {
    slicedArr.push(arr[i]);
  }

  return slicedArr;
}


log(slice([1, 2, 3], 1, 2));               // [1, 2, 2]
log(slice([1, 2, 3], 2, 0));               // []
log(slice([1, 2, 3], 5, 1));               // []
log(slice([1, 2, 3], 0, 5));               // [1, 2, 3]