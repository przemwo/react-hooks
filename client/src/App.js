import React, { useState } from 'react';

// import { MyComponentHooks as MyComponent } from './MyComponentHooks';
import { MyComponentClass as MyComponent } from './MyComponentClass';


export class App extends React.Component {
    state = {
        showMyComponent: true,
    };
    render() {
        return(
            <div className="card-container">
                {this.state.showMyComponent && <MyComponent />}
            </div>
        );
    }
};
