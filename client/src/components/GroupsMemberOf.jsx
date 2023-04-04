import React, { useState } from "react";
import { MDBBtn } from "mdbreact";
import FetchGroupsMembersOf from "./FetchGroupsMemberOf";
import OpenGroup from "./OpenGroup";
import "/src/styles/AllGroups.css";

function GroupsMemberOf({ userId, groupCreated, groupDeleted, joinedGroup, setJoinedGroup}) {
    const getRandomColor = () => {
        const hue = Math.floor(Math.random() * 360);
        const pastel = "60%";
        return `hsl(${hue}, ${pastel}, ${pastel})`;
    };

    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleGroupClick = (group) => {
        if (selectedGroup && selectedGroup.id === group.id) {
            setSelectedGroup(null);
        } else {
            setSelectedGroup(group);
        }
    };

    return (
        <>
            <FetchGroupsMembersOf userId={userId} groupCreated={groupCreated} groupDeleted={groupDeleted} joinedGroup={joinedGroup} >
                {({ groups }) => (
                    <div>
                        {groups.length === 0 && <p>You do not belong to any groups.</p>}
                        {groups.length > 0 && (
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
                    </div>
                )}
            </FetchGroupsMembersOf>
            <br></br>
            {selectedGroup && <OpenGroup group={selectedGroup} userId={userId} setJoinedGroup={setJoinedGroup} />}
        </>
    );
}

export default GroupsMemberOf;
