import React, { useEffect, useState } from "react";
import HomePage from "./HomePage";

function NewUser({ name, email, password }) {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

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
                setUser(data);
            } catch (err) {
                setError(err.message);
            }
        }

        createUser();
    }, [name, email, password]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if(user === null){
        return <div>Loading...</div>
    }

    return( 
        <HomePage
            name={user.name}
        />
    )
}

export default NewUser;
