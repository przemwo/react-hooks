import React, { useState } from 'react';

// import { MyComponentHooks as MyComponent } from './MyComponentHooks';
import { MyComponentClass as MyComponent } from './MyComponentClass';


export const App = () => {
    return(
        <div className="card-container">
            <MyComponent />
        </div>
    );
};
