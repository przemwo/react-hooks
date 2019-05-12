import React, { useState } from 'react';


export const MyComponentHooks = () => {
    const [userName, setUserName] = useState("fmal");

    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    };

    return (
        <div className="card">
            <h2>User name: <span>{userName}</span></h2>
            <input
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={handleChangeUserName}
            />
        </div>
    );
};