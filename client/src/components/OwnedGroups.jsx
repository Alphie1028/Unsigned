import React from 'react';
import FetchOwnedGroups from './FetchOwnedGroups';

function OwnedGroups({ userId }) {
    return (
        <FetchOwnedGroups userId={userId}>
            {({ owned }) => (
                <div>
                    <h2>Groups You Own</h2>
                    {owned.length > 0 ? (
                        <ul>
                            {owned.map((owned) => (
                                <li key={owned.id}>
                                    {owned.name} - {owned.description}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>You don't own any groups yet.</p>
                    )}
                </div>
            )}
        </FetchOwnedGroups>
    );
}

export default OwnedGroups;