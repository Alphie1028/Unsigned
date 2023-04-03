import React from 'react';

function DisplayPosts({ posts }) {
    return (
        <div>
            <h2>Posts:</h2>
            {posts.length === 0 && <p>There are no posts in this group.</p>}
            {posts.length > 0 && (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <p>Author: {post.author}</p>
                            <p>Created at: {post.created_at}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DisplayPosts;

