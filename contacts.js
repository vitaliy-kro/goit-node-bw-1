const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function getContacts() {
  const read = await fs.readFile(contactsPath);
  const normalizedContacts = JSON.parse(read);
  return normalizedContacts;
}

async function getContactById(contactId) {
  const contacts = await getContacts();
  const findedContact = contacts.find(({ id }) => id === contactId);

  return findedContact;
}

async function removeContact(contactId) {
  const contacts = await getContacts();
  const filtredContacts = contacts.filter(({ id }) => id !== contactId);

  fs.writeFile(contactsPath, JSON.stringify(filtredContacts));
}

async function addContact(name, email, phone) {
  const contacts = await getContacts();
  const contactToAdd = {
    id: (+contacts.at(-1).id + 1).toString(),
    name,
    email,
    phone,
  };
  contacts.push(contactToAdd);

  fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
};
