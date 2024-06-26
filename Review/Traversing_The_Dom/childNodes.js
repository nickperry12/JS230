/*
How many direct and indirect child nodes does each parent node — starting with
the element with an id of 1 — have in the DOM generated by the following HTML:

<div id="1">
  <h1 id="2">Hello, <em id="3">World</em></h1>
  <p id="4">
    Welcome to wonderland. This is an
    <span id="5">awesome</span> place.
  </p>
  <a href="#" id="6"><strong id="7">Enter</strong></a>
  <div id="8"><p id="9"><a href="#" id="10">Go back</a></p></div>
</div>

Consider the following when counting the direct and indirect child nodes for
each parent node:

Any DOM node that has at least one child node is a parent node.
Indirect child nodes are the child nodes of child nodes.

Solution:
Parent Nodes:

div#1: 9 direct, 12 direct
h1#2: 2 direct, 1 indirect
em#3: 1 direct, 0 indirect
p#4: 3 direct, 1 indirect
span#5: 1 direct, 0 indirect
a#6: 1 direct, 1 indirect
strong#7: 1 direct, 0 indirect
div#8: 1 direct, 2 indirect
p#9: 1 direct, 1 indirect
a#10: 1 direct, 0 indirect
*/