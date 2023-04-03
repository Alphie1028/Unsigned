import React, {useState} from "react";
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

function CreateGroup({userId}){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:3000/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                description,
                creator_id: userId,
            }),
        });

        if (!response.ok) {
            console.error('Failed to update group:', response);
            alert('Failed to update group. Please try again later.');
            return;
        }

        const group = await response.json();
        console.log('Group updated:', group);
        setModalOpen(false);
    };
    
    return (
        <div>
            <MDBBtn color="primary" onClick={toggleModal}>
                Create New Group
            </MDBBtn>

            <MDBModal isOpen={modalOpen} toggle={toggleModal}>
                <MDBModalHeader toggle={toggleModal}>Create New Group</MDBModalHeader>
                <MDBModalBody>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name-input">Name:</label>
                        <input
                            type="text"
                            id="name-input"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                        <br />
                        <label htmlFor="description-input">Description:</label>
                        <textarea
                            id="description-input"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            required
                        />
                        <br />
                    </form>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggleModal}>
                        Cancel
                    </MDBBtn>
                    <MDBBtn color="primary" onClick={handleSubmit}>
                        Create
                    </MDBBtn>
                </MDBModalFooter>
            </MDBModal>
            
        </div>
    );
}
export default CreateGroup;