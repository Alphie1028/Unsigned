import React, { useState, useEffect } from "react";
import FetchPosts from "./FetchPosts";
import JoinButton from "./JoinButton";
import { MDBContainer, MDBJumbotron } from "mdbreact";

function OpenGroup({ group, userId, joinedGroup, setJoinedGroup }) {
    const hue = Math.floor(Math.random() * 360);
    const backgroundColor = `hsl(${hue}, 60%, 60%)`;

    const [isMember, setIsMember] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let groupId = group.id;

    useEffect(() => {
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

        if (userId) {
            checkMembership();
        }
    }, [groupId, userId, joinedGroup]);

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
                    <div>You are a member of this group.</div>
                ) : (
                            <JoinButton groupId={group.id} userId={userId} setJoinedGroup={setJoinedGroup} />
                )}
                <FetchPosts groupId={group.id} />
            </MDBJumbotron>
        </MDBContainer>
    );
}

export default OpenGroup;




