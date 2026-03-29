import { Link } from 'react-router-dom'
import useGlobalReducer from "../hooks/useGlobalReducer";

const CardContact = ({ contact }) => {
    const { actions } = useGlobalReducer()

    const eliminarContacto = async () => {
        await actions.deleteContact(contact.id);
    };

    return (
        <li className="list-group-item py-4">
            <div className="d-flex align-items-center justify-content-between gap-4">
                <div className="d-flex justify-content-center" style={{ width: "100px", minWidth: "100px" }}>
                    <img
                        className="rounded-circle"
                        src="https://picsum.photos/170/170/"
                        alt="Contact"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                </div>
                <div className="flex-grow-1">
                    <h5 className="fw-bold mb-2">{contact.name}</h5>
                    <p className="mb-1 text-secondary">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        {contact.address}
                    </p>
                    <p className="mb-1 text-secondary">
                        <i className="fas fa-phone me-2"></i>
                        {contact.phone}
                    </p>
                    <p className="mb-0 text-secondary">
                        <i className="fas fa-envelope me-2"></i>
                        {contact.email}
                    </p>
                </div>
                <div className="d-flex align-items-start gap-3">
                    <Link to={"/edit-contact/" + contact.id} className="btn btn-link p-0 text-dark">
                        <i className="fas fa-pencil-alt"></i>
                    </Link>
                    <button type="button" className="btn btn-link p-0 text-dark" data-bs-toggle="modal" data-bs-target={"#delete-contact-" + contact.id} >
                        <i className="fa fa-trash"></i>
                    </button>

                    <div className="modal fade" id={"delete-contact-" + contact.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    If you delete this thing the etire universe will go down!
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-primary " data-bs-dismiss="modal">Oh no!</button>
                                    <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={eliminarContacto}>Yes baby!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
export default CardContact