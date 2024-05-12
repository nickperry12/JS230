export class APIHandler {
  #id = 0;

  async getContacts() {
    let response = await fetch('http://localhost:3000/api/contacts');
    return await response.json();
  }

  async getContactByID(id) {
    let response = await fetch(`http://localhost:3000/api/contacts${id}`);
    return await response.json();
  }

  async deleteContact(id) {
    let data = { id: id };
    let options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    await fetch(`http://localhost:3000/api/contacts/${id}`, options)
      .then(response => {
        if (response.ok) {
          alert('Contact has been successfuly deleted.');
        } else {
          alert(response.statusText);
        }
      })
      .catch(error => console.error('Error:', error));
  }

  async addContact(formData) {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    await fetch('http://localhost:3000/api/contacts/', options)
      .then((response) => {
        if (response.ok) {
          alert('The contact has been successfully added.');
        } else {
          alert(response.statusText);
        }
      })
      .catch(error => console.error('Error:', error));
  }

  async updateContact(id, newData) {
    newData.id = parseInt(id);
    let options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    }

    await fetch(`http://localhost:3000/api/contacts/${id}`, options)
      .then((response) => {
        if (response.ok) {
          alert('Contact info has been successfully updated.');
        } else {
          alert(response.statusText);
        }
      })
      .catch((error) => console.error('Error:', error));
  }
}