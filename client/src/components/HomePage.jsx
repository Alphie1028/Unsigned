import React from "react";
import AllGroups from "./AllGroups";

function HomePage({name}){
    return(
        <>
            <h1>{name}</h1>
            <AllGroups />
        </>
        
    )
}
export default HomePage;