import React, { useState, useEffect } from "react";
import DisplayPosts from "./DisplayPosts";

function FetchPosts({ groupId }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch(`http://localhost:3000/posts/${groupId}`);
            const json = await response.json();
            setPosts(json);
        }
        fetchPosts();
    }, [groupId]);

    // return the posts state
    return <DisplayPosts posts={posts} />;
}

export default FetchPosts;
