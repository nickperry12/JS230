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
        this.displayHandler.renderEditContactForm();
        this.displayHandler.renderContacts(result);
        this.bind();
    });
  }

  clearMain() {
    let main = document.querySelector('main');
    main.innerHTML = '';
  }

  editSubmitHandler(event, id) {
    event.preventDefault();
    let form = document.querySelector('#edit-contact-form');
    let formData = new FormData(form);

    let data = this.apiHandler.getContactByID(id);

    formData.forEach((key, val) => {
      data[val] = key;
    });

    this.apiHandler.updateContact(id, data);
    this.clearMain();
    this.setupMain();
  }

  bind() {
    let showAllBtn = document.querySelector('#show-all');
    showAllBtn.addEventListener('click', event => {
      event.preventDefault();
      this.clearMain();
      this.setupMain();
    });

    let addBtn = document.querySelector('#add-new-contact-btn');
    addBtn.addEventListener('click', this.displayHandler.toggleContactView);

    let cancelBtns = document.querySelectorAll('input[value="Cancel"]');
    cancelBtns.forEach(btn => {
      if (btn.id === 'edit-contact-cancel') {
        btn.addEventListener('click', this.displayHandler.toggleEditContactView);
      } else {
        btn.addEventListener('click', this.displayHandler.toggleContactView);
      }
    });

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
      } else if (ele.tagName === 'INPUT' && ele.id === 'edit_contact') {
        this.displayHandler.toggleEditContactView(event);
        let id = ele.parentNode.dataset.contactId;
        let editSubmitBtn = document.querySelector('#edit-contact-submit');
        document.querySelector('main').scrollIntoView(true);
        

        let eventFunction = (event) => {
          this.editSubmitHandler(event, id);
        }

        editSubmitBtn.removeEventListener('click', eventFunction);
        editSubmitBtn.addEventListener('click', eventFunction);
      }
    });

    let submitBtn = document.querySelector('input[id="new-contact-submit"]');
    submitBtn.addEventListener('click', event => {
      event.preventDefault();
      this.apiHandler.addContact();
      this.clearMain();
      this.setupMain();
    });

    let searchBar = document.querySelector('#search-contacts')
    searchBar.addEventListener('keyup', async event => {
      await this.apiHandler.getContacts()
        .then((result) => {
          let filteredContacts = result.filter(contact => {
            let value = searchBar.value.toLowerCase();
            let name = contact.full_name.toLowerCase();
            return name.startsWith(value);
          });

          let contactList = document.querySelector('#contact-list');
          contactList.remove();
          this.displayHandler.renderContacts(filteredContacts);
        });
    });

    let tags = [...document.querySelectorAll('a.tag-link')];
    tags.forEach(tag => {
      tag.addEventListener('click', async event => {
        event.preventDefault();
        await this.apiHandler.getContacts()
          .then((result) => {
            let filteredContacts = result.filter(contact => {
              let value = event.target.textContent;
              if (contact.tags !== null) {
                return contact.tags.includes(value);
              }
            });

            let contactList = document.querySelector('#contact-list');
            contactList.remove();
            this.displayHandler.renderContacts(filteredContacts);
          });
      })
    })

  }
}