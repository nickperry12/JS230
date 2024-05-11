/*
Write a JavaScript function that takes an element's id and returns the DOM tree
of the element in a two-dimensional array. The first subarray contains the
element and its siblings, the second contains the parent of the element and its
siblings, so on and so forth, all the way up to the "grandest" parent. Assume
that the grandest parent is the element with an id of "1". Use the following
HTML and test cases to test your code:

-- Modelling:

I: 22
O: [["A"], ["STRONG"], ["SPAN", "SPAN"], ["P", "P"], ["SECTION", "SECTION"], ["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]

We start at a#22 (the given id is 22)

We check for any siblings, and if there are any present, we take the element
and its siblings, and place into an array
=> [["A"]]

Next, we get the parent element of "A"
=> strong#21

Check for siblings of this element, and place into an array like before:
=> [["A"], ["STRONG"]]

Repeat the process of moving up to the last elements parent, finding its
siblings, and placing into the array


*/
function domTreeTracer(id) {
  let element = document.querySelector(`[id="${id}"]`);
  let elementNodes = [];

  while (element.tagName !== 'BODY') {
    let eleAndSiblings = [...element.parentNode.children].map(ele => {
      return ele.tagName;
    });

    elementNodes.push(eleAndSiblings);
    element = element.parentNode;
  }

  return elementNodes;
}

domTreeTracer(1);
// [["ARTICLE"]]
// domTreeTracer(2);
// // [["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]
// domTreeTracer(22);
// [["A"], ["STRONG"], ["SPAN", "SPAN"], ["P", "P"], ["SECTION", "SECTION"], ["HEADER", "MAIN", "FOOTER"], ["ARTICLE"]]