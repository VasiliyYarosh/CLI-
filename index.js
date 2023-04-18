const contacts = require('./contacts');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')


const invokeAction = async ({ action, id, name, email, phone }) =>  {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts()
            return console.table(allContacts)

        case "get":
            const oneOfContacts = await contacts.getContactById(id)
            return console.log(oneOfContacts)

        case "add":
            const newContact = await contacts.addContact({ name, email, phone })
            return console.log(newContact)

        case "remove":
            const removeContact = await contacts.removeContact(id)
            return console.log(removeContact)

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

// invokeAction({action: "list"});no
// invokeAction({ action: "get", id: "AeHIrLTr6JkxGE6SN-0Rw"});
// invokeAction({ action: "add", name: "Vasiliy Yarosh", email: "vasilliy.yarosh@gmail.com", phone: "+380 66 107 84 57"});
// invokeAction({ action: "remove", id: "EHRTNtMyr1vQ47rFJnlf9"});

// invokeAction(args);

const arr = hideBin(process.argv);
const {argv} = yargs(arr)
invokeAction(argv);