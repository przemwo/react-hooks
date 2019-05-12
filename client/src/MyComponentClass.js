import React from 'react';


export class MyComponentClass extends React.Component {
    state = {
        userName: "fmal",
    }

    handleChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    };

    render() {
        return(
            <div className="card">
                <h2>User name: <span>{this.state.userName}</span></h2>
                <input
                    type="text"
                    name="userName"
                    id="userName"
                    value={this.state.userName}
                    onChange={this.handleChangeUserName}
                />
            </div>
        );
    }
}