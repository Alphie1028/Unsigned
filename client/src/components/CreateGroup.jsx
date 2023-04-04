import React, {useState} from "react";
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import "/src/styles/CreateGroup.css"

function CreateGroup({userId, setGroupCreated}){
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
            console.error('Failed to create group:', response);
            alert('Failed to create group. Please try again later.');
            return;
        }

        const group = await response.json();
        console.log('Group created:', group);

        // Add the user as a member to the group
        const groupMembersResponse = await fetch('http://localhost:3000/group_members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                group_id: group.id,
                user_id: userId,
            }),
        });

        if (!groupMembersResponse.ok) {
            console.error('Failed to add user as a member to the group:', groupMembersResponse);
            alert('Failed to add user as a member to the group. Please try again later.');
            return;
        }

        console.log('User added as a member to the group:', groupMembersResponse);

        // Reset the form and close the modal
        setName('');
        setDescription('');
        setGroupCreated(true);
        setModalOpen(false);
        setGroupCreated(false)
    };
    
    return (
        <div>
            <MDBBtn className="create-group-button" color="primary" onClick={toggleModal}>
                Create New Group
            </MDBBtn>

            <MDBModal className="create-group-modal" isOpen={modalOpen} toggle={toggleModal}>
                <MDBModalHeader className="create-group-modal-header" toggle={toggleModal}>Create New Group</MDBModalHeader>
                <MDBModalBody>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name-input">Name:</label>
                        <input type="text" id="name-input" value={name} onChange={(event) => setName(event.target.value)} required />
                        <br />
                        <label htmlFor="description-input">Description:</label>
                        <textarea id="description-input" value={description} onChange={(event) => setDescription(event.target.value)} required />
                        <br />
                    </form>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn className="create-group-cancel-button" color="secondary" onClick={toggleModal}>
                        Cancel
                    </MDBBtn>
                    <MDBBtn className="create-group-submit-button" color="primary" onClick={handleSubmit}>
                        Create
                    </MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </div>
    );
}
export default CreateGroup;