import React from "react";
import FetchPosts from "./FetchPosts";
import { MDBContainer, MDBJumbotron } from "mdbreact";

function OpenGroup({ group }) {
    const hue = Math.floor(Math.random() * 360); // generate a random hue value
    const backgroundColor = `hsl(${hue}, 60%, 60%)`; // set saturation and lightness to fixed values

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
                <FetchPosts groupId={group.id} />
            </MDBJumbotron>
        </MDBContainer>
    );
}

export default OpenGroup;

