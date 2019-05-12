import React, { useState, useRef, useEffect } from 'react';


export const MyComponentHooks = () => {
    const [userName, setUserName] = useState("fmal");
    const inputRef = useRef();

    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    };

    useEffect(() => {
        inputRef.current.select();
    }, []);

    return (
        <div className="card">
            <h2>User name: <span>{userName}</span></h2>
            <input
                ref={inputRef}
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={handleChangeUserName}
            />
        </div>
    );
};