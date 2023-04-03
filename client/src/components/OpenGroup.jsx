import React from "react";

function OpenGroup({ group }) {
    return (
        <div>
            <h1>{group.name}</h1>
            <p>{group.description}</p>
            {/* additional code for displaying group info */}
        </div>
    );
}

export default OpenGroup;