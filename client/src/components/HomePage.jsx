import React from "react";
import AllGroups from "./AllGroups";
import GroupsMemberOf from "./GroupsMemberOf";
import OwnedGroups from "./OwnedGroups";


function HomePage({name, userId}){
    return(
        <>
            <h1>{name}</h1>
            <br></br>
            <h1>ALL GROUPS</h1>
            <AllGroups />
            <br></br>
            <h1>MEMBER OF GROUPS</h1>
            <GroupsMemberOf userId={userId}/>
            <br></br>
            <h1>MY GROUPS</h1>
            <OwnedGroups userId={userId}/>
        </>
        
    )
}
export default HomePage;