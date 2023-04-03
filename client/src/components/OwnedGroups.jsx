import React, { useState } from "react";
import { MDBBtn } from "mdbreact";
import FetchOwnedGroups from "./FetchOwnedGroups";
import OpenGroup from "./OpenGroup";
import "./AllGroups.css";

function OwnedGroups({ userId }) {
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
            <FetchOwnedGroups userId={userId}>
                {({ owned }) => (
                    <div className="d-flex justify-content-center">
                        {owned.map((group) => (
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
            </FetchOwnedGroups>
            {selectedGroup && <OpenGroup group={selectedGroup} />}
        </>
    );
}

export default OwnedGroups;

