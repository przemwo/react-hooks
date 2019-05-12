import React, { useState } from 'react';

import { ListWithHooks as List } from './ListWithHooks';
// import { ListWithClass as List } from './ListWithClass';


export const App = () => {
    const [userLogin, setUserLogin] = useState("fmal");
    const handleUserIDChanged = (e) => {
        setUserLogin(e.target.value);
    }
    return (
        <div className="container">
            <header>
                <nav>
                    <div>
                        <label htmlFor="fmal">Filip Malinowski</label>
                        <input
                            type="radio"
                            id="fmal"
                            name="userLogin"
                            value="fmal"
                            checked={userLogin == "fmal"}
                            onChange={handleUserIDChanged}
                        />
                    </div>
                    <div>
                        <label htmlFor="iamshaunjp">Shaun</label>
                        <input
                            type="radio"
                            id="iamshaunjp"
                            name="userLogin"
                            value="iamshaunjp"
                            checked={userLogin == "iamshaunjp"}
                            onChange={handleUserIDChanged}
                        />
                    </div>
                    <div>
                        <label htmlFor="gaearon">Dan Abramov</label>
                        <input
                            type="radio"
                            id="gaearon"
                            name="userLogin"
                            value="gaearon"
                            checked={userLogin == "gaearon"}
                            onChange={handleUserIDChanged}
                        />
                    </div>
                </nav>
            </header>
            <List listID={userLogin} />
        </div>
    );
};
