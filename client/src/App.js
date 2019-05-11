import React from 'react';

import { ListWithHooks as List } from './ListWithHooks';
// import { ListWithClass as List } from './ListWithClass';


export default class App extends React.Component {
    state = {
        listID: "fmal",
    };
    render() {
        return(
            <div className="container">
                <nav>
                    <button onClick={() => this.setState({ listID: "fmal" })}>Filip Malinowski</button>
                    <button onClick={() => this.setState({ listID: "iamshaunjp" })}>Shaun</button>
                    <button onClick={() => this.setState({ listID: "gaearon" })}>Dan Abramov</button>
                </nav>
                <List listID={this.state.listID} />
            </div>
        );
    }
}