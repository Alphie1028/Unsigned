import React from "react";
import AllGroups from "./AllGroups";
import GroupsMemberOf from "./GroupsMemberOf";
import OwnedGroups from "./OwnedGroups";
import "./HomePage.css"


function HomePage({name, userId}){
    return(
        <>
            <h1>{name}</h1>
            <br></br>
            <div id="myGroups">
                <h1>MY GROUPS</h1>
            </div>
            <br></br>            
            <OwnedGroups userId={userId}/>            
            <br></br>
            <div id="memberOf">
                <h1>MEMBER OF GROUPS</h1> 
            </div>
            <br></br>
            <GroupsMemberOf userId={userId}/>
            <br></br>
            <div id="allGroups">
                <h1>ALL GROUPS</h1>    
            </div>
            <br></br>
            <AllGroups />
            
        </>
        
    )
}
export default HomePage;