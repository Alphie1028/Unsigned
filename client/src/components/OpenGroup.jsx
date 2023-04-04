import React, { useState, useEffect } from "react";
import FetchPosts from "./FetchPosts";
import JoinButton from "./JoinButton";
import { MDBContainer, MDBJumbotron } from "mdbreact";
import LeaveGroup from "./LeaveGroup";

function OpenGroup({ group, userId, joinedGroup, setJoinedGroup }) {
    const hue = Math.floor(Math.random() * 360);
    const backgroundColor = `hsl(${hue}, 60%, 60%)`;

    const [isMember, setIsMember] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let groupId = group.id;

    async function checkMembership() {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3000/group_members/${groupId}/${userId}`);
            if (response.ok) {
                setIsMember(true);
            } else {
                setIsMember(false);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (userId) {
            checkMembership();
        }
    }, [groupId, userId, joinedGroup]);

    async function removeFromGroup() {
        const response = await fetch(`http://localhost:3000/group_members/${groupId}/${userId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            console.error('Failed to remove user from group:', response);
            alert('Failed to remove user from group. Please try again later.');
            return;
        }
        setIsMember(false);
    }

    return (
        <MDBContainer className="d-flex justify-content-center align-items-center">
            <MDBJumbotron
                fluid
                className="py-4 px-5 mb-0 text-center"
                style={{
                    backgroundColor: backgroundColor,
                    borderRadius: "25px",
                }}
            >
                <h1 className="display-3">{group.name}</h1>
                <p className="lead">{group.description}</p>
                {isLoading ? (
                    <div>Loading...</div>
                ) : isMember ? (
                    <>
                        <div>You are a member of this group.</div>
                        <LeaveGroup isMember={isMember} removeFromGroup={removeFromGroup} />
                    </>
                ) : (
                    <JoinButton groupId={group.id} userId={userId} setJoinedGroup={setJoinedGroup} />
                )}
                <FetchPosts groupId={group.id} />
            </MDBJumbotron>
        </MDBContainer>
    );
}

export default OpenGroup;






