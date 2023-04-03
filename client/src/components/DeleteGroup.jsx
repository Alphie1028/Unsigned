import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdbreact';

function DeleteGroup({ userId, setGroupDeleted, groupCreated}) {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    useEffect(() => {
        async function fetchGroups() {
            const response = await fetch(`http://localhost:3000/users/${userId}/creator`);
            const groups = await response.json();
            setGroups(groups);
        }
        fetchGroups();
    }, [userId, groupCreated]);

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:3000/groups/${selectedGroup.id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            console.error('Failed to delete group:', response);
            alert('Failed to delete group. Please try again later.');
            return;
        }
        setGroups(groups.filter(group => group.id !== selectedGroup.id));
        setSelectedGroup(null);
        setGroupDeleted(true);
        toggleModal();

    };

    return (
        <>
            <MDBDropdown>
                <MDBDropdownToggle caret color="primary">
                    Delete Group
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    {groups.map(group => (
                        <MDBDropdownItem key={group.id} onClick={() => setSelectedGroup(group)}>
                            {group.name}
                        </MDBDropdownItem>
                    ))}
                </MDBDropdownMenu>
            </MDBDropdown>
            <MDBModal isOpen={!!selectedGroup} toggle={() => setSelectedGroup(null)}>
                <MDBModalHeader toggle={() => setSelectedGroup(null)}>Delete Group</MDBModalHeader>
                <MDBModalBody>
                    Are you sure you want to delete the group "{selectedGroup?.name}"?
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={() => setSelectedGroup(null)}>Cancel</MDBBtn>
                    <MDBBtn color="danger" onClick={toggleModal}>Delete</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
            <MDBModal isOpen={modalOpen} toggle={toggleModal}>
                <MDBModalHeader toggle={toggleModal}>Confirm Deletion</MDBModalHeader>
                <MDBModalBody>
                    Are you sure you want to delete the group "{selectedGroup?.name}"? This action cannot be undone.
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggleModal}>Cancel</MDBBtn>
                    <MDBBtn color="danger" onClick={handleDelete}>Delete</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </>
    );
}

export default DeleteGroup;
