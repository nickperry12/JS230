// Coloring

// Write a function that colors a specific generation of the DOM tree. A
// generation is a set of elements that are on the same level of indentation.
// We'll be using a "styled" HTML for this exercise to better visualize the
// generations. You may use the .generation-color class to color the specific
// generation. You can assume that only non-negative integers will be provided
// as arguments.

/*
Write a function that accepts a non-negative integer as an argument, that colors
a specific generation of the DOM tree. A generation is the set of elements that
are on the same level of indentation.

-- Modeling:

I: 4
O: Elements with an ID of 4, 7, 12, 16 colored


  <body>
    <article id="1">1
      <header id="2" class="child1x1">2
        <span id="3" class="child1x1">3
          <a href="#" id="4" class="child1x1">4</a>
        </span>
      </header>
      <main id="5" class="child1x2">5
        <section id="6" class="child1x1">6
          <p id="7" class="child1x1">7
            <span id="8" class="child1x1">8
              <strong id="9" class="child1x1">9
                <a href="#" id="10" class="child1x1">10</a>
              </strong>
            </span>
          </p>
        </section>
        <section id="11" class="child1x2">11
          <p id="12" class="child1x1">12
            <span id="13" class="child1x1">13
              <strong id="14" class="child1x1">14
                <a href="#" id="15" class="child1x1">15</a>
              </strong>
            </span>
          </p>
          <p id="16" class="child1x2">16
            <span id="17" class="child1x1">17
              <strong id="18" class="child1x1">18
                <a href="#" id="19" class="child1x1">19</a>
              </strong>
            </span>
            <span id="20" class="child1x2">20
              <strong id="21" class="child1x1">21
                <a href="#" id="22" class="child1x1">22</a>
              </strong>
            </span>
          </p>
        </section>
      </main>
      <footer id="23" class="child1x6">23
        <p id="24" class="child1x1">24</p>
      </footer>
    </article>
  </body>

We need to do `n` amount of iterations, where `n` is the number argument passed in
- We start with `i` === 1, and increment by 1 after each iteration
  - Break when `i` is greater than `n`

Elements with ids 4, 7, 12 and 16 are in-line


Firt iteration we get the children of `body`
- We need to flatten the array as we go along
  => [<article>]

Second iteration we get the children of `article`
  => [<header 2>, <main 5>, <footer 23>]

Third iteration we get the children of all the previous children
  => [<span 3>, <section 6>, <section 11>]

Fourth and final iteration we get the children of all the previous children
  => [<a 4>, <p 7>, <p 12>, <p 16>]

Now apply the colors

Algorithm:

Initialize `currentGen` an array with a single element; the HTML body element

Iterate from 1 to the target generation, breaking when the current iteration
number is greater than the target generation
- Iterate through the elements of `currentGen`
  - Transform each element to an array of its children
    - Flatten the returned collection into a 1D array
- Reassign `currentGen` to the result

Iterate through `currentGen`
- Apply the `generation-color` class to each element in the collection
*/

function colorGeneration(targetGen) {
  let currentGen = [document.body];
  let counter = 1;

  while (counter <= targetGen) {
    currentGen = currentGen.flatMap(ele => [...ele.children]);
    counter += 1;
  }

  currentGen.forEach(ele => ele.classList.add('generation-color'));
}
