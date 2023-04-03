import React, { useEffect, useState } from 'react';

function FetchGroupsMembersOf({ userId, children, groupCreated, groupDeleted }) {
    const [memberOfGroups, setMemberOfGroups] = useState([]);

    useEffect(() => {
        async function fetchGroupsMembersOf() {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}/groups`);
                const data = await response.json();
                setMemberOfGroups(data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchGroupsMembersOf()
    }, [userId, groupCreated, groupDeleted]);

    return (
        <>
            {children({ groups: memberOfGroups })}
        </>
    );
}

export default FetchGroupsMembersOf;
