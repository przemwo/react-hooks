import React from 'react';

// import { ListWithHooks as List } from './ListWithHooks';
import { ListWithClass as List } from './ListWithClass';


export default class App extends React.Component {
    state = {
        listID: 1,
    };
    render() {
        return(
            <div className="container">
                <nav>
                    <button onClick={() => this.setState({ listID: 1})}>przemwo</button>
                    <button onClick={() => this.setState({ listID: 2})}>iamshaunjp</button>
                </nav>
                <List listID={this.state.listID} />
            </div>
        );
    }
}