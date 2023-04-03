import React from 'react';

function DisplayComments({ comments }) {
    return (
        <div>
            <h2>Comments:</h2>
            {comments.length === 0 && <p>No comments to display</p>}
            {comments.map(comment => (
                <div key={comment.id}>
                    <p>{comment.content}</p>
                    <p>Posted at: {new Date(comment.created_at).toLocaleString()}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default DisplayComments;
