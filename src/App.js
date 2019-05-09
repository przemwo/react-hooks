import React from 'react';

import MyComponent from './MyComponent';
import { directive } from '@babel/types';


export default class App extends React.Component {
    state = {
        user: 1,
    };
    render() {
        return(
            <div className="container">
                <nav>
                    <button onClick={() => this.setState({ user: 1})}>przemwo</button>
                    <button onClick={() => this.setState({ user: 2})}>iamshaunjp</button>
                </nav>
                <MyComponent user={this.state.user} />
            </div>
        );
    }
}