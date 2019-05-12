import React from 'react';


export class MyComponentClass extends React.Component {
    state = {
        userName: "fmal",
        windowWidth: 0,
    }

    inputRef = React.createRef();

    handleChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    };

    componentDidMount() {
        this.inputRef.current.select();
        window.addEventListener('resize', this.handleWindowResized);
        this.handleWindowResized();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResized);
    }

    handleWindowResized = () => {
        console.log('resizing'); //shows importance of removing event listener on unmounting
        this.setState({ windowWidth: window.innerWidth });
    }

    render() {
        return(
            <div className="card">
                <h2>Width: {this.state.windowWidth}</h2>
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