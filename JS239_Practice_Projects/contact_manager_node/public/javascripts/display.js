export class Display {
  constructor(apiHandler) {
    this.renderAddContact();
    this.renderSearchBar();
    this.renderContacts();
    this.apiHandler = apiHandler;
  }

  renderContacts() {
    let contacts = this.apiHandler.getContacts();
    let template = document.querySelector('#contact-list-template').innerHTML;
    let compiledTemplate = Handlebars.compile(template);

    
  }
}