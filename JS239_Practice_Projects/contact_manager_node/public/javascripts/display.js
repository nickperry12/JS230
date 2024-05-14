export class DisplayHandler {
  constructor(apiHandler) {
    this.apiHandler = apiHandler;
  }

  renderContacts(contacts) {
    let template = document.querySelector('#contact-list-template').innerHTML;
    let compiledTemplate = Handlebars.compile(template);
    let container = document.querySelector('main');
    let div = document.createElement('div');
    div.id = 'contact-list';
    div.innerHTML = compiledTemplate({ contacts: contacts });
    container.insertAdjacentElement('beforeend', div);
  }

  renderAddBtnSearchBar() {
    let template = document.querySelector('#add-and-search-template').innerHTML;
    let compiledTemplate = Handlebars.compile(template);
    let div = document.createElement('DIV');
    div.id = 'add-and-search';
    let container = document.querySelector('main');

    div.innerHTML = compiledTemplate();
    container.insertAdjacentElement('afterbegin', div);
  }

  renderAddContactForm() {
    let template = document.querySelector('#add-contact-template').innerHTML;
    let compiledTemplate = Handlebars.compile(template);
    let container = document.querySelector('main');
    let div = document.createElement('DIV');
    div.id = 'add-contact-div';
    div.innerHTML = compiledTemplate();
    div.classList.add('hide');

    container.insertAdjacentElement('beforeend', div);
  }

  toggleView(event) {
    event.preventDefault();
    let ele = document.querySelector('#add-contact-div');
    ele.classList.toggle('hide');
  }
}