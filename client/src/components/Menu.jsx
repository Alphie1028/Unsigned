import React from "react";
import CreateGroup from "./CreateGroup";

function Menu({userId}){
    return(
        <div>
            <h1>Menu</h1>
            <CreateGroup userId={userId}/>  
        </div>
       
    )
}
export default Menu;