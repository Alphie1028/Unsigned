import React, { useEffect, useState } from "react";

function NewUser({ name, email, password }) {
    const [error, setError] = useState(null);

    useEffect(() => {
        async function createUser() {
            try {
                const response = await fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                });
                const data = await response.json();
                console.log("User created:", data);
            } catch (err) {
                setError(err.message);
            }
        }

        createUser();
    }, [name, email, password]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <div>New user created!</div>;
}

export default NewUser;
