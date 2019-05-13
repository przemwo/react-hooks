import React, { useState, useRef, useEffect } from 'react';


const useUserName = (name) => {
    const [userName, setUserName] = useState(name);
    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    };
    return [
        userName,
        handleChangeUserName
    ];
};

const useFocus = () => {
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.select();
    }, []);
    return inputRef;
};

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        const handleWindowResized = () => {
            console.log('resizing'); //shows importance of removing event listener on unmounting
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleWindowResized);
        handleWindowResized();
        return () => {
            window.removeEventListener('resize', handleWindowResized);
        };
    }, []);
    return windowWidth;
};

const useTimer = (userName) => {
    const [timer, setTimer] = useState(0);
    useEffect(() => {
        setTimer(0);
        const intervalID = setInterval(() => {
            console.log('tick');
            setTimer(timer => timer + 1);
        }, 1000);
        return () => {
            clearInterval(intervalID);
        };
    }, [userName]);
    return timer;
};

export const MyComponentHooks = () => {
    const [userName, handleChangeUserName] = useUserName("fmal");
    const [userAge, handleChangeUserAge] = useUserName(30);

    const inputRef = useFocus();

    const windowWidth = useWindowWidth();

    const timer = useTimer(userName);
    const timerAge = useTimer(userAge);

    return (
        <div className="card">
            <h2>Width: {windowWidth}</h2>
            <h2>User name: <span>{userName}</span></h2>
            <h2>User age: <span>{userAge}</span></h2>
            <input
                ref={inputRef}
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={handleChangeUserName}
            />
            <h5>userName updated {timer}s ago</h5>
            <input
                type="text"
                name="userAge"
                id="userAge"
                value={userAge}
                onChange={handleChangeUserAge}
            />
            <h5>userAge updated {timerAge}s ago</h5>
        </div>
    );
};