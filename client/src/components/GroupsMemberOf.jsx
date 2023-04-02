import React from 'react';
import FetchGroupsMembersOf from './FetchGroupsMemberOf';

function GroupsMemberOf({userId}) {
    return (
        <FetchGroupsMembersOf userId={userId}>
            {({ groups }) => (
                <div>
                    <h2>Groups You Belong To:</h2>
                    {groups.length === 0 && <p>You do not belong to any groups.</p>}
                    {groups.length > 0 && (
                        <ul>
                            {groups.map((group) => (
                                <li key={group.id}>
                                    {group.name} - {group.description}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </FetchGroupsMembersOf>
    );
}

export default GroupsMemberOf;
