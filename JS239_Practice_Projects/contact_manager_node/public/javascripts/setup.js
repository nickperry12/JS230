export class SetupHandler {
  constructor(apiHandler, displayHandler) {
    this.apiHandler = apiHandler;
    this.displayHandler = displayHandler;
    this.setupMain();
  }

  async setupMain() {
    await this.apiHandler.getContacts()
      .then((result) => {
        this.displayHandler.renderAddBtnSearchBar();
        this.displayHandler.renderAddContactForm();
        this.displayHandler.renderContacts(result);
        this.bind();
    });
  }

  clearMain() {
    let main = document.querySelector('main');
    main.innerHTML = '';
  }

  bind() {
    let addBtn = document.querySelector('#add-new-contact-btn')
    addBtn.addEventListener('click', this.displayHandler.toggleView);

    let cancelBtn = document.querySelector('#new-contact-cancel');
    cancelBtn.addEventListener('click', this.displayHandler.toggleView);

    let contactList = document.querySelector('ul#contact-list');
    contactList.addEventListener('click', async event => {
      let ele = event.target

      if (ele.tagName === 'INPUT' && ele.id === 'delete_contact') {
        let id = ele.parentNode.dataset.contactId;

        if (confirm('Are you sure you want to delete this contact?')) {
          await this.apiHandler.deleteContact(id)
          .then(() =>  {
            this.clearMain();
            this.setupMain();
          });
        }
      }
    });

    let form = document.querySelector('form#add-contact-form');
    let submitBtn = document.querySelector('#new-contact-submit');
  
    submitBtn.addEventListener('click', event => {
      event.preventDefault();
      let formData = new FormData(form);
  
      this.apiHandler.addContact(formData);
      this.clearMain();
      this.setupMain();
    });
  }
}