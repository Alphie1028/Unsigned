import React from "react";
import CreateGroup from "./CreateGroup";

function Menu({userId, setGroupCreated}){
    return(
        <div>
            <h1>Menu</h1>
            <CreateGroup userId={userId} setGroupCreated = {setGroupCreated}/>  
        </div>
       
    )
}
export default Menu;