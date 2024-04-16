// Buggy Code

// The code below is buggy. The person who created the code expects that nothing
// will happen when the user clicks on the image. This, however, isn't the case;
// clicking the image still brings the user to another web page.

// Study the code and explain the bug

document.querySelector('img').addEventListener('click', event => {
  event.stopPropagation();
}, false);

/*
The code does not behave as expected because the `stopPropagation` method
does not provide the behavior the user is looking for. The `stopPropagation`
method stops the event from moving any further up the chain after the even
reaches the element it originally fired on during the "targeting" phase. To
achieve the results the user wants, the `preventDefault()` method must be
called on the event.
*/