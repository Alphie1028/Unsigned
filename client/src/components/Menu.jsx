import React from "react";
import CreateGroup from "./CreateGroup";
import DeleteGroup from "./DeleteGroup";

function Menu({userId, setGroupCreated, setGroupDeleted, groupCreated}){
    return(
        <div>
            <h1>Menu</h1>
            <CreateGroup userId={userId} setGroupCreated = {setGroupCreated}/>
            <DeleteGroup userId={userId} setGroupDeleted={setGroupDeleted} groupCreated={groupCreated} />  
        </div>
       
    )
}
export default Menu;