// Go over the two HTML snippets. How many nodes will the resulting DOM tree
// have?

function walk(node, callback) {
  callback(node)

  for (let i = 0; i < node.childNodes.length; i ++) {
    walk(node.childNodes[i], callback);
  }
}

// HTML 1:

/* 
<div>
<p>Then press the <em>Draw</em> button</p> 
</div>
*/

// HTML 2
/*
<div><p>Then press the <em>Draw</em> button</p></div>
*/

/*
The HTML1 snippet will contain 11 nodes:
1. HTML
2. Head
3. Body
4. Div
5. #Text
6. P
7. #Text
8. Em
9. #Text
10. #Text (After Em Closing tag)
11. #Text (After P Closing tag)

The HTML2 snippet will contain 9 nodes:
1. HTML
2. Head
3. Body
4. Div
5. P
6. #Text
7. Em
8. #Text
9. #Text (After Em Closing tag)

The difference is two #Text nodes missing from the HTML2 snippet. There are two
missing due to the `<p>` tags being placed inline within the `<div>` tags. When
they are placed inline, the two #Text nodes that represent newline characters
are left out. When the `<p>` tag is placed on its own line, two #Text nodes
representing newline characters are placed at the beginning of the `<div>` tag
and another just before its closing tag.
*/