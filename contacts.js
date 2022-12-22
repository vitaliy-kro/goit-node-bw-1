const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const read = await fs.readFile(contactsPath);
  const normalizedContacts = JSON.parse(read);
  return normalizedContacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const findedContact = contacts.find(({ id }) => +id === contactId);
  console.log("findedContact", findedContact);

  return contacts.find(({ id }) => id === contactId);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const filtredContacts = contacts.filter(({ id }) => +id !== contactId);
  console.log("filtredContacts", filtredContacts);

  fs.writeFile(contactsPath, JSON.stringify(filtredContacts));
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const contactToAdd = {
    id: (+contacts[contacts.length - 1].id + 1).toString(),
    name,
    email,
    phone,
  };
  contacts.push(contactToAdd);
  console.log("contacts", contacts);

  fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
