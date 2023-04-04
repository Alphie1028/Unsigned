import React, {useState} from "react";
import AllGroups from "./AllGroups";
import GroupsMemberOf from "./GroupsMemberOf";
import OwnedGroups from "./OwnedGroups";
import Menu from "./Menu";
import "/src/styles/HomePage.css"


function HomePage({name, userId}){
    const [groupCreated, setGroupCreated] = useState(false);
    const [groupDeleted, setGroupDeleted] = useState(false);
    const [joinedGroup, setJoinedGroup] = useState(false);
    

    return(
        <>
            <h1>{name}</h1>
            <Menu userId={userId} setGroupCreated={setGroupCreated} setGroupDeleted={setGroupDeleted} groupCreated={groupCreated} />
            <br></br>
            <div id="myGroups">
                <h1>MY GROUPS:</h1>
            </div>
            <br></br>            
            <OwnedGroups userId={userId} groupCreated={groupCreated} groupDeleted={groupDeleted} joinedGroup={joinedGroup} setJoinedGroup={setJoinedGroup}/>            
            <br></br>
            <div id="memberOf">
                <h1>MEMBER OF:</h1> 
            </div>
            <br></br>
            <GroupsMemberOf userId={userId} groupCreated={groupCreated} groupDeleted={groupDeleted} joinedGroup={joinedGroup} setJoinedGroup={setJoinedGroup} />
            <br></br>
            <div id="allGroups">
                <h1>ALL GROUPS:</h1>    
            </div>
            <br></br>
            <AllGroups userId={userId} groupCreated={groupCreated} groupDeleted={groupDeleted} joinedGroup={joinedGroup} setJoinedGroup={setJoinedGroup} />
            
        </>
        
    )
}
export default HomePage;