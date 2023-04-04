import React from "react";
import CreateGroup from "./CreateGroup";
import DeleteGroup from "./DeleteGroup";
import "/src/styles/Menu.css"

function Menu({ userId, setGroupCreated, setGroupDeleted, groupCreated }) {
    return (
        <div id="menu">
            <h1>Menu</h1>
            <div id="options">
                <CreateGroup userId={userId} setGroupCreated={setGroupCreated} className="create-group-button" />
                <DeleteGroup userId={userId} setGroupDeleted={setGroupDeleted} groupCreated={groupCreated} className="delete-group-button" />
            </div>
        </div>
    )
}

export default Menu;
