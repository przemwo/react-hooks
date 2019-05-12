import React from 'react';

import { ListWithHooks as List } from './ListWithHooks';
// import { ListWithClass as List } from './ListWithClass';


export default class App extends React.Component {
    state = {
        userLogin: "fmal",
    };
    handleUserIDChanged = (e) => {
        this.setState({ userLogin: e.target.value });
    }
    render() {
        return(
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
                                checked={this.state.userLogin == "fmal"}
                                onChange={this.handleUserIDChanged}
                            />
                        </div>
                        <div>
                            <label htmlFor="iamshaunjp">Shaun</label>
                            <input
                                type="radio"
                                id="iamshaunjp"
                                name="userLogin"
                                value="iamshaunjp"
                                checked={this.state.userLogin == "iamshaunjp"}
                                onChange={this.handleUserIDChanged}
                            />
                        </div>
                        <div>
                            <label htmlFor="gaearon">Dan Abramov</label>
                            <input
                                type="radio"
                                id="gaearon"
                                name="userLogin"
                                value="gaearon"
                                checked={this.state.userLogin == "gaearon"}
                                onChange={this.handleUserIDChanged}
                            />
                        </div>
                    </nav>
                </header>
                <List listID={this.state.userLogin} />
            </div>
        );
    }
}