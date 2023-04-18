const fs = require("fs/promises")
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json")


const listContacts= async () => {
    const getList = await fs.readFile(contactsPath)
    return JSON.parse(getList)
}

const getContactById = async (id) => {
    const contactId = String(id)
    const contacts = await listContacts()
    const res = contacts.find(item => item.id === contactId);
    return res
}

const removeContact = async (id) => {
    const contactId = String(id)
    const contacts = await listContacts()
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null
    }
    const [res] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return res;
} 



const addContact = async (contacts) =>  {
    const contact = await listContacts();
    const newContact = {
        id: nanoid(),
        ...contacts,
    }
    contact.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contact))
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}