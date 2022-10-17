import { useContext } from 'react'
import { GlobalStoreContext } from '../store'


function DeleteListModal() {
    const { store } = useContext(GlobalStoreContext);
    let nameOfList = ""
    if (store.markedListForDelete) {
        nameOfList = store.markedListForDelete.name;
    }
    const handleDeleteList = (event) => {
        store.deleteMarkedList();
    }
    const handleDeleteListClose = (event) => {
        store.hideDeleteListModal();
    }
    return (
        <div
            className="modal"
            id="delete-list-modal"
            data-animation="slideInOutLeft">
            <div className="modal-root" id='verify-delete-list-root'>
                <div className="modal-north">
                    Delete playlist?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Are you sure you wish to permanently delete the {nameOfList} playlist?
                    </div>
                </div>
                <div className="modal-south">
                    <input type="button"
                        id="delete-list-confirm-button"
                        className="modal-button"
                        onClick={handleDeleteList}
                        value='Confirm' />
                    <input type="button"
                        id="delete-list-cancel-button"
                        className="modal-button"
                        onClick={handleDeleteListClose}
                        value='Cancel' />
                </div>
            </div>
        </div>


    )
}

export default DeleteListModal;