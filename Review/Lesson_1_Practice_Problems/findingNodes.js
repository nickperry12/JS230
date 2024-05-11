// 1. Write some JavaScript code to retrieve a word count for each h2 heading on
//    the page.

let h2List = document.querySelectorAll('h2');
let wordCount = [...h2List].map(h2 => {
  let text = h2.textContent.trim().split(' ');
  return text.length;
});
console.log(wordCount);

// 2 The page has a table of contents with the title "Contents" and links to the
// different content sections on "Naming and etymology," "Taxonomy and
// evolution," etc.

// Use three different DOM methods to retrieve a reference to the div element
// that contains the table of contents.

document.querySelector('div#toc');
document.getElementById('toc');
document.getElementsByClassName('toc')[0];

// 3. Write some JavaScript code to change the color for every odd indexed link
//    in the table of contents to green.

let linksArr = [...document.querySelectorAll('#toc a')];
linksArr.forEach((link, idx) => {
  if (idx % 2 === 1) { link.style.color = 'green' }
});

// 4. Write some JavaScript code to retrieve the text of every thumbnail caption
//    on the page.

let thumbCaptions = [...document.querySelectorAll('.thumbcaption')].map(cap => {
  return cap.textContent.trim();
});

// 5. You can think of the scientific classification of an animal as a series of
//    key-value pairs. Here, the keys are taxonomic ranks (Kingdom, Phylum,
//    Class, etc.). The values are the specific groups to which the animal
//    belongs.

//    Write JavaScript code that extracts the classification of animals from the
//    web page and logs an Object that uses the ranks as keys and the groups as
//    values. You may assume the taxonomic ranks to use as keys is provided for you
//    as an array.

let ranks = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species'];
let table = document.querySelectorAll('.infobox td');
let classifications = {};

table.forEach(cell => {
  ranks.forEach(rank => {
    if (cell.textContent.indexOf(rank) !== -1) {
      let link = cell.nextElementSibling.firstElementChild;
      classifications[rank] = link.textContent;
    }
  });
});
