/*
When the user clicks on a navigation link (Articles 1-4), the browser scrolls to
that article in the <main> element and adds the highlight class to it. If
another element already has the highlight class, the browser removes the class
from that element. 

When the user clicks on an article element or any of its child elements, the
browser adds the highlight class to it. If another element already has the
highlight class, the browser removes the class from that element. 

When the user clicks anywhere else on the page, the browser adds the highlight
class to the main element. If another element already has the highlight class,
the browser removes the class from that element.

-- Modelling:

Click on one of four navigation links:
- Scroll to the clicked article
  - Add highlight class to it
- If any other element has the highlight class, remove it

Click on any of the article elements:
- Add the highlight class to it
- If any other element has the highlight class, remove it

Click anywhere else on the page:
- Add highlight class to `main` element
- Remove highlight element from any other class

Element.scrollIntoView() method to scroll to the clicked article
*/
function removeHighlight() {
  let articles = document.querySelectorAll('article');
  let main = document.querySelector('main')

  main.classList.remove('highlight');
  
  for (let i = 0; i < articles.length; i++) {
    articles[i].classList.remove('highlight');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let links = document.querySelector('ul');
  let main = document.querySelector('main');

  links.addEventListener('click', event => {
    event.preventDefault();
    removeHighlight();
    let articleId = event.target.href.match(/article-\d+/g)[0];
    let article = document.getElementById(articleId);
    article.scrollIntoView();
    article.classList.add('highlight');
  });

  main.addEventListener('click', event => {
    let ele = event.target;

    if (ele.tagName === 'ARTICLE') {
      removeHighlight();
      ele.classList.add('highlight');
    } else {
      removeHighlight();
      main.classList.add('highlight');
    }
  });
});
