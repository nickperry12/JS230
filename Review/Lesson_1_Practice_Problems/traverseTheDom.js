function walk(node, callback) {
  callback(node);

  for (let i = 0; i < node.childNodes.length; i++) {
    walk(node.childNodes[i], callback);
  }
}

// 1. Starting with the document node, use the lastChild and childNodes
//    properties to change the text color to red on the On the River heading and
//    set its font size 48 pixels.

// let html = document.childNodes[1];
// let body = html.lastChild;
// let h1 = body.childNodes[1];

// h1.style.color = 'red';
// h1.style.fontSize = '48px';

// 2. Count the paragraphs on the page, and then log the result.

// let paraCount = 0;

// walk(document.body, node => {
//   if (node.tagName === 'P') { paraCount += 1 }
// });

// 3. Retrieve the first word from each paragraph on the page and log the entire
//    list.

// let paraList = [];

// walk(document.body, node => {
//   if (node.tagName === 'P') {
//     paraList.push(node);
//     let firstWord = node.textContent.trim().split(' ')[0];
//     console.log(firstWord);
//   }
// });

// console.log(paraList);

// 4. Add the class stanza to each paragraph except the first.

// paraList.forEach((para, idx) => {
//   if (idx !== 0) { para.classList.add('stanza'); }
// });

// 5. Count the images on the page, then count the PNG images. Log both results.

// let imgCount = 0;
// let pngCount = 0;

// walk(document.body, node => {
//   if (node.tagName === 'IMG') {
//     imgCount += 1

//     if (node.src.match(/png/)) {
//       pngCount += 1;
//     }
//   };
// });

// 6. Change the link color to red for every link on the page.

// walk(document.body, node => {
//   if (node.tagName === 'A') {
//     node.style.color = 'red';
//   }
// })