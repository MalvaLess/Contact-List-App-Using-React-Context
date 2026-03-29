export const initialStore=()=>{
  return{
    message: null,
    contacts: [],
    agendaSlug: "malvaless",
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export const createAgenda = async (slug) => {
  const check = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`);
  if (check.ok) return true; 

  const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
  return response.ok;
}

export const getContacts = async (dispatch) => {
  const response = await fetch("https://playground.4geeks.com/contact/agendas/malvaless/contacts");

  if (response.ok) {
    const data = await response.json();
    const contacts = Array.isArray(data) ? data : Array.isArray(data.contacts) ? data.contacts : [];
    dispatch({
      type: "set_contacts",
      payload: contacts
    });
    return true;
  }

  return false;
}

export const createContact = async (contact, dispatch) => {
  const response = await fetch("https://playground.4geeks.com/contact/agendas/malvaless/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      address: contact.address
    })
  });

  if (response.ok) {
    await getContacts(dispatch);
    return true;
  }

  return false;
}

export const updateContact = async (id, contact, dispatch) => {
  const response = await fetch(`https://playground.4geeks.com/contact/agendas/malvaless/contacts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      address: contact.address
    })
  });

  if (response.ok) {
    await getContacts(dispatch);
    return true;
  }

  return false;
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case "set_contacts":
      return {
        ...store,
        contacts: action.payload
      };

    case "remove_contact":
      return {
        ...store,
        contacts: store.contacts.filter((contact) => contact.id !== action.payload.id)
      };

    case 'add_task':
      const { id, color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    default:
      throw Error('Unknown action.');
  }    
}