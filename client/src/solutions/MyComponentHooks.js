import React, { useState, useRef, useEffect } from 'react';


export const MyComponentHooks = () => {
    const [userName, setUserName] = useState("fmal");
    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    };
    
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.select();
    }, []);
    
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        const handleWindowResized = () => {
            console.log('resizing'); //shows importance of removing event listener on unmounting
            setWindowWidth(window.innerWidth);
        }
        handleWindowResized();
        window.addEventListener('resize', handleWindowResized);
        return () => window.removeEventListener('resize', handleWindowResized);
    },[]);
    
    const [timer, setTimer] = useState(0);
    useEffect(() => {
        const id = setInterval(() => {
            console.log('tick');
            setTimer(timer => timer + 1);
        }, 1000);
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