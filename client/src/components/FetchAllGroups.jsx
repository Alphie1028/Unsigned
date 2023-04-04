import React, { useEffect, useState } from 'react';

function FetchAllGroups({ children, groupCreated, groupDeleted, joinedGroup}){
    const [groups, setGroups] = useState([]);

    useEffect(()=>{
        async function fetchGroups() {
            try{
                const response = await fetch('http://localhost:3000/groups');
                const data = await response.json();
                setGroups(data);
            } catch (err){
                console.log(err);
            }
        }

        fetchGroups()
    }, [groupCreated, groupDeleted, joinedGroup])

    return children({groups})
}

export default FetchAllGroups;