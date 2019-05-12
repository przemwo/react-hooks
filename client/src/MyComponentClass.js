import React from 'react';


export class MyComponentClass extends React.Component {
    state = {
        userName: "fmal",
    }

    inputRef = React.createRef();

    handleChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    };

    componentDidMount() {
        this.inputRef.current.select();
    }

    render() {
        return(
            <div className="card">
                <h2>User name: <span>{this.state.userName}</span></h2>
                <input
                    ref={this.inputRef}
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