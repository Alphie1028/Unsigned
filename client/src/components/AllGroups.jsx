import React, { useState } from "react";
import { MDBBtn } from "mdbreact";
import FetchAllGroups from "./FetchAllGroups";
import OpenGroup from "./OpenGroup";
import './AllGroups.css';

function AllGroups() {
    const getRandomColor = () => {
        const hue = Math.floor(Math.random() * 360);
        const pastel = "40%";
        return `hsl(${hue}, ${pastel}, ${pastel})`;
    };

    const [openGroup, setOpenGroup] = useState(null);

    const handleClick = (group) => {
        setOpenGroup(group);
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
                                onClick={() => handleClick(group)}
                            >
                                {group.name}
                            </MDBBtn>
                        ))}
                    </div>
                )}
            </FetchAllGroups>
            {openGroup && <OpenGroup group={openGroup} />}
        </>
    );
}


export default AllGroups;












