import React, { useState, useRef, useEffect } from 'react';


export const MyComponentHooks = () => {
    const [userName, setUserName] = useState("fmal");
    const [windowWidth, setWindowWidth] = useState(0);
    const [timer, setTimer] = useState(0);
    const inputRef = useRef();

    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    };

    useEffect(() => {
        inputRef.current.select();
    }, []);

    useEffect(() => {
        const handleWindowResized = () => {
            console.log('resizing'); //shows importance of removing event listener on unmounting
            setWindowWidth(window.innerWidth);
        }
        handleWindowResized();
        window.addEventListener('resize', handleWindowResized);
        return () => window.removeEventListener('resize', handleWindowResized);
    },[]);

    useEffect(() => {
        const id = setInterval(() => {
            setTimer(timer => timer + 3);
        }, 3000);
        return () => {
            setTimer(0);
            clearInterval(id);
        };
    }, [userName]);

    return (
        <div className="card">
            <h2>Width: {windowWidth}</h2>
            <h2>User name: <span>{userName}</span></h2>
            <input
                ref={inputRef}
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={handleChangeUserName}
            />
            <h5>userName updated {timer}s ago</h5>
        </div>
    );
};