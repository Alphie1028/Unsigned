import React from "react";
import FetchAllGroups from "./FetchAllGroups";


function AllGroups(){
    return(
        <FetchAllGroups>
            {({ groups }) => (
                <div>
                    <h2>All Groups</h2>
                    {groups.map((group) => (
                        <div key={group.id}>
                            <h3>{group.name}</h3>
                            <p>{group.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </FetchAllGroups>
    )
}

export default AllGroups;