import React, { useState } from "react";
import { MDBBtn } from "mdbreact";
import FetchAllGroups from "./FetchAllGroups";
import OpenGroup from "./OpenGroup";
import './AllGroups.css';

function AllGroups() {
    const getRandomColor = () => {
        const hue = Math.floor(Math.random() * 360);
        const pastel = "60%";
        return `hsl(${hue}, ${pastel}, ${pastel})`;
    };

    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleGroupClick = (group) => {
        setSelectedGroup(prevSelectedGroup =>
            prevSelectedGroup === group ? null : group
        );
    };

    return (
        <>
            
            <FetchAllGroups>
                {({ groups }) => (
                    <div className="d-flex justify-content-center">
                        {groups.map((group) => (
                            <MDBBtn
                                key={group.id}
                                color="primary"
                                rounded
                                className="mx-2"
                                style={{ backgroundColor: getRandomColor() }}
                                title={group.description}
                                data-mdb-toggle="tooltip"
                                data-mdb-placement="bottom"
                                onClick={() => handleGroupClick(group)}
                            >
                                {group.name}
                            </MDBBtn>
                        ))}
                    </div>
                )}
            </FetchAllGroups>
            <br></br>
            {selectedGroup && <OpenGroup group={selectedGroup} />}
        </>
    );
}

export default AllGroups;











