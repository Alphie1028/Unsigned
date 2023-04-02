import React, { useEffect, useState } from 'react';

function FetchAllGroups({children}){
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
    }, [])

    return children({groups})
}

export default FetchAllGroups;