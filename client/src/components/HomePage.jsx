import React from "react";
import AllGroups from "./AllGroups";
import GroupsMemberOf from "./GroupsMemberOf";

function HomePage({name, userId}){
    return(
        <>
            <h1>{name}</h1>
            <AllGroups />
            <GroupsMemberOf userId={userId}/>
        </>
        
    )
}
export default HomePage;