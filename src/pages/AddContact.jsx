import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { store, actions } = useGlobalReducer();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoadingContact, setIsLoadingContact] = useState(Boolean(id));
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadContact = async () => {
      if (!id) {
        if (isMounted) setIsLoadingContact(false);
        return;
      }

      if (store.contacts.length === 0) {
        if (isMounted) setIsLoadingContact(true);
        const loaded = await actions.getContacts();
        if (!loaded && isMounted) setIsLoadingContact(false);
        return;
      }

      const contactToEdit = store.contacts.find(
        (contact) => String(contact.id) === String(id)
      );

      if (contactToEdit) {
        setFullName(contactToEdit.name ?? "");
        setEmail(contactToEdit.email ?? "");
        setPhone(contactToEdit.phone ?? "");
        setAddress(contactToEdit.address ?? "");
      }

      if (isMounted) setIsLoadingContact(false);
    };

    loadContact();

    return () => {
      isMounted = false;
    };
  }, [id, store.contacts, actions]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedAddress) {
      setErrorMessage("Please complete all fields before saving.");
      return;
    }

    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      address: trimmedAddress
    };

    if (id) {
      await actions.updateContact(id, payload);
    } else {
      await actions.createContact(payload);
    }

    navigate("/");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <h1 className="text-center display-4 fw-bold mb-4">
            {id ? "Edit contact" : "Add a new contact"}
          </h1>

          {id && isLoadingContact ? (
            <p className="text-center">Loading...</p>
          ) : (
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              {errorMessage && (
                <div className="alert alert-danger mb-0" role="alert">
                  {errorMessage}
                </div>
              )}
              <div>
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  id="phone"
                  type="text"
                  className="form-control"
                  placeholder="Enter phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  id="address"
                  type="text"
                  className="form-control"
                  placeholder="Enter address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                save
              </button>
              <Link to="/">or get back to contacts</Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
