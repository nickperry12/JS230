document.addEventListener('DOMContentLoaded', () => {
  const slideshow = {
    prevSlide(event) {
      event.preventDefault();
      let prev = this.currentSlide.previousElementSibling;
      if (!prev) {
        prev = this.lastSlide;
      }
      this.fadeOut(this.currentSlide);
      this.fadeIn(prev);
      this.renderPhotoContent(prev.getAttribute('data-id'));
      this.currentSlide = prev;
    },
    nextSlide(event) {
      event.preventDefault();
      let next = this.currentSlide.nextElementSibling;
      if (!next) {
        next = this.firstSlide;
      }
      this.fadeOut(this.currentSlide);
      this.fadeIn(next);
      this.renderPhotoContent(next.getAttribute('data-id'));
      this.currentSlide = next;
    },
    fadeOut(slide) {
      slide.classList.add('hide');
      slide.classList.remove('show');
    },
    fadeIn(slide) {
      slide.classList.remove('hide');
      slide.classList.add('show');
    },
    renderPhotoContent(idx) {
      renderPhotoInformation(Number(idx));
      getCommentsFor(idx);
    },
    bind() {
      let prevButton = document.querySelector('a.prev');
      let nextButton = document.querySelector('a.next');
      prevButton.addEventListener('click', event => {
        this.prevSlide(event);
      });

      nextButton.addEventListener('click', event => {
        this.nextSlide(event);
      });
    },
    init() {
      this.slideshow = document.querySelector('#slideshow');
      let slides = this.slideshow.querySelectorAll('figure');
      this.firstSlide = slides[0];
      this.lastSlide = slides[slides.length - 1];
      this.currentSlide = this.firstSlide;
      this.bind();
    }
  };

  const templates = {};
  let request = new XMLHttpRequest();
  let photos;

  document.querySelectorAll("script[type='text/x-handlebars'").forEach(tmpl => {
    templates[tmpl.id] = Handlebars.compile(tmpl.innerHTML);
  });

  document.querySelectorAll("[data-type='partial']").forEach(tmpl => {
    Handlebars.registerPartial(tmpl.id, tmpl.innerHTML);
  })

  function renderPhotos() {
    let slides = document.getElementById('slides');
    slides.insertAdjacentHTML('beforeend', templates.photos({ photos: photos }));
  }

  function renderPhotoInformation(idx) {
    let photo = photos.filter(function(item) {
      return item.id === idx;
    })[0];

    let header = document.querySelector("section > header");
    header.innerHTML = '';
    header.insertAdjacentHTML('beforeend', templates.photo_information(photo));
  }

  function getCommentsFor(idx) {
    fetch('/comments?photo_id=' + idx)
      .then(response => response.json())
      .then(commentJson => {
        let commentList = document.querySelector('#comments ul');
        commentList.insertAdjacentHTML('beforeend', templates.photo_comments({ comments: commentJson }));
      })

  }
  
  document.querySelector("section > header").addEventListener("click", function(e) {
    e.preventDefault();
    let button = e.target;
    let buttonType = button.getAttribute("data-property");
    if (buttonType) {
      let href = button.getAttribute("href");
      let dataId = button.getAttribute("data-id");
      let text = button.textContent;
  
      fetch(href, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: 'photo_id=' + dataId
      })
      .then(response => response.json())
      .then(json => {
        button.textContent = text.replace(/\d+/, json.total);
        fetch("/photos")
          .then(response => response.json())
          .then(json => photos = json);
      });
    }
  });

  document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    let form = e.target;
    let href = form.getAttribute("action");
    let method = form.getAttribute("method");
    let data = new FormData(form);
    let currentSlideId = slideshow.currentSlide.getAttribute('data-id');
    data.set('photo_id', currentSlideId);
  
    fetch(href, {
      method: method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams([...data])
    })
    .then(response => response.json())
    .then(json => {
      let commentsList = document.querySelector('#comments ul');
      commentsList.insertAdjacentHTML('beforeend', templates.photo_comment(json));
      form.reset();
    });
  });

  request.open('GET', '/photos');

  request.addEventListener('load', event => {
    photos = JSON.parse(request.response);
    renderPhotos();
    renderPhotoInformation(photos[0].id);
    getCommentsFor(photos[0].id);
    slideshow.init();
  });

  request.send();
});