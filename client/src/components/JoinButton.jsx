import React, { useState } from "react";
import { MDBBtn } from "mdbreact";

function JoinButton({ groupId, userId, setJoinedGroup}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleClick = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:3000/group_members", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ group_id: groupId, user_id: userId }),
            });
            if (response.ok) {
                setIsSubmitting(false);
                setJoinedGroup(true);
                setJoinedGroup(false);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again later.");
        }
    };

    return (
        <MDBBtn
            color="primary"
            size="sm"
            disabled={isSubmitting}
            onClick={handleClick}
            style={{ position: "absolute", top: "10px", right: "10px" }}
        >
            {isSubmitting ? "Joining..." : "Join Group"}
            {error && <p className="text-danger">{error}</p>}
        </MDBBtn>
    );
}

export default JoinButton;
