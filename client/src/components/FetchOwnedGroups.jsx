import React, { useEffect, useState } from 'react';


function FetchOwnedGroups({userId, children, groupCreated, groupDeleted}){
    const [ownedGroups, setOwnedGroups] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchOwnedGroups() {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}/creator`);
                const data = await response.json();
                setOwnedGroups(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchOwnedGroups();
    }, [userId, groupCreated, groupDeleted]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
    <>
        {children({ owned: ownedGroups })}
    </>
    )
}

export default FetchOwnedGroups;