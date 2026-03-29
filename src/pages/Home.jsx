import { useEffect } from "react";
import { Link } from "react-router-dom";
import CardContact from "../components/CardContact.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
  const { store, actions } = useGlobalReducer();
  const contacts = Array.isArray(store.contacts) ? store.contacts : [];

  useEffect(() => {
    const init = async () => {
      await actions.createAgenda();
      await actions.getContacts();
    };
    init();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add-contact" className="btn btn-outline-success">
          Add new contact
        </Link>
      </div>

      <ul className="list-group">
        {contacts.map((contact) => (
          <CardContact key={contact.id} contact={contact} />
        ))}
      </ul>

      {contacts.length === 0 && (
        <p className="text-center mt-3">
          No hay contactos en tu agenda. ¡Añade el primero!
        </p>
      )}
    </div>
  );
};  