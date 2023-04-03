import React from "react";
import FetchPosts from "./FetchPosts";
function OpenGroup({ group }) {
    return (
        <div>
            <h1>{group.name}</h1>
            <p>{group.description}</p>
            <FetchPosts groupId={group.id}/>
            {/* additional code for displaying group info */}
        </div>
    );
}

export default OpenGroup;