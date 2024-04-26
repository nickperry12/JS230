let post = {
  title: 'Lorem ipsum dolor sit amet',
  published: 'April 1, 2015',
  body: 'Sed ut perspiciatis unde omnis iste natus <strong>error</strong> sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.'
};

let posts = [
  post,
  {
    title: 'A day in the life',
    published: 'April 2, 2015',
    body: 'This is a day in the life of a wonderful dog named Tommy.',
    tags: ['Dogs', 'Lifestyle', 'Pets']
  },
  {
    title: 'Study tips for LS',
    published: 'April 3, 2015',
    body: 'This is how I prepared for the LS JS230 Written Assessment...',
    tags: []
  },
  {
    title: 'NFL Draft Day',
    published: 'April 25, 2024',
    body: 'ITS NFL DRAFT DAY!!!!!',
    tags: ['football', 'sports']
  }
    
]

let blogPost = Handlebars.compile($('#posts').html());
let tagTemplate = Handlebars.compile($('#tagTemplate').html());

Handlebars.registerPartial('tagTemplate', $('#tagTemplate').html());

post.tags = ['lifestyle', 'advice', 'blog', 'journal'];

$(document.body).append(blogPost({posts: posts}));
