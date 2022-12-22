const { Command } = require("commander");

const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      getContacts()
        .then((contacts) => console.log(contacts))
        .catch((err) => console.log(err.message));
      break;

    case "get":
      getContactById(id)
        .then((contact) => console.log(contact))
        .catch((err) => console.log(err.message));
      break;

    case "add":
      addContact(name, email, phone)
        .then((_) => console.log(`Contact ${name} added succesfully`))
        .catch((err) => console.log(err));
      break;

    case "remove":
      removeContact(id).then((_) =>
        console.log(`Contact with id-${id} removed successfully`)
      );
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
