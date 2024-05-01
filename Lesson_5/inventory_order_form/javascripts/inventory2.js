let inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      let date = new Date();
      document.querySelector('#order_date').textContent = date.toUTCString();
    },
    cacheTemplate: function() {
      let iTmpl = document.querySelector('#inventory_item');
      this.template = Handlebars.compile(iTmpl.innerHTML);
      iTmpl.remove();
    },
    add: function() {
      this.lastId++;
      let item = {
        id: this.lastId,
        name: '',
        stock_number: '',
        quantity: 1
      };

      this.collection.push(item);

      return item;
    },
    remove: function(id) {
      this.collection = this.collection.filter(item => item.id !== id);
    },
    get: function(id) {
      let found_item;

      this.collection.find(item => {
        if (item.id === id) {
          found_item = item;
          return true;
        }
      });

      return found_item;
    },
    update: function(itemRow) {
      let id = this.findID(itemRow);
      let item = this.get(id);

      item.name = itemRow.querySelector("[name^=item_name").value;
      item.stock_number = itemRow.querySelector("[name^=item_stock_number]").value;
      item.quantity = itemRow.querySelector("[name^=item_quantity]").value;
    },
    newItem: function(event) {
      event.preventDefault();
      let item = this.add();

      document.querySelector('#inventory')
              .insertAdjacentHTML('beforeend', this.template({id: item.id}));
    },
    findParent: function(event) {
      let ele = event.target;
      return ele.closest('tr');
    },
    findID: function(inputItem) {
      return Number(inputItem.querySelector('input[type=hidden]').value);
    },
    deleteItem: function(event) {
      event.preventDefault();
      if (event.target.classList.contains('delete')) {
        let item = this.findParent(event);
        this.remove(this.findID(item));
        item.remove();
      }
    },
    updateItem: function(event) {
      if (event.target.tagName === 'INPUT') {
        let item = this.findParent(event);
        this.update(item);
      }

    },
    bindEvents: function() {
      document.querySelector("#add_item").addEventListener('click', this.newItem.bind(this));
      document.querySelector("#inventory")
              .addEventListener('click', this.deleteItem.bind(this));
      document.querySelector("#inventory")
              .addEventListener('focusout', this.updateItem.bind(this));
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  }
}());

document.addEventListener('DOMContentLoaded', e => inventory.init.bind(inventory)());