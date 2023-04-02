import React, { useEffect, useState } from "react";
import HomePage from "./HomePage";


function CheckUserInfo({ email, password }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
                const data = await response.json();
                setUser(data);
                if(data.message){
                    throw new Error(data.message);

                }
                //catch doesnt do nun, fix it later
            } catch (err) {
                setError(err.message);
            }
        }

        fetchUser();
    }, [email, password]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <HomePage
            name = {user.name}
        />
    );
}

export default CheckUserInfo;