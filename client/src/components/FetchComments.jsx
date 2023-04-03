import React, { useState, useEffect } from "react";
import DisplayComments from "./DisplayComments";

function FetchComments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}/comments`);
        const json = await response.json();
        setComments(json);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchComments();
  }, [postId]);

  return <DisplayComments comments={comments} />;
}

export default FetchComments;
