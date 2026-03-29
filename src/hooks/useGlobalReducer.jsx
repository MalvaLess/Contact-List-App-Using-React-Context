import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore, getContacts, createContact, updateContact, createAgenda } from "../store"

const StoreContext = createContext()

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore())

    const actions = {
        createAgenda: async () => {
            return await createAgenda(store.agendaSlug);
        },

        getContacts: async () => {
            return await getContacts(dispatch);
        },

        createContact: async (contact) => {
            return await createContact(contact, dispatch);
        },

        updateContact: async (id, contact) => {
            return await updateContact(id, contact, dispatch);
        },

        deleteContact: async (id) => {
            const response = await fetch(
                `https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts/${id}`,
                { method: "DELETE" }
            );

            if (response.ok) {
                dispatch({
                    type: "remove_contact",
                    payload: { id }
                });
                return true;
            }

            return false;
        }
    };

    return <StoreContext.Provider value={{ store, dispatch, actions }}>
        {children}
    </StoreContext.Provider>
}

export default function useGlobalReducer() {
    const { dispatch, store, actions } = useContext(StoreContext)
    return { dispatch, store, actions };
}