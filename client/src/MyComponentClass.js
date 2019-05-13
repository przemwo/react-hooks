import React from 'react';


export class MyComponentClass extends React.Component {
    state = {
        userName: "fmal",
        windowWidth: 0,
        timer: 0,
    }

    inputRef = React.createRef();

    intervalID = null;

    handleChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    };

    componentDidMount() {
        this.inputRef.current.select();
        window.addEventListener('resize', this.handleWindowResized);
        this.handleWindowResized();
        this.setTimerInterval();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.userName !== this.state.userName) {
            this.setState({ timer: 0 });
            clearInterval(this.intervalID); // clear old interval...
            this.setTimerInterval(); // ...and start new interval
        }
    }

    setTimerInterval = () => {
        this.intervalID = setInterval(() => {
            console.log('tick');
            this.setState(state => ({ timer: state.timer + 1 }));
        }, 1000);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResized);
        clearInterval(this.intervalID);
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
                <h5>userName updated {this.state.timer}s ago</h5>
            </div>
        );
    }
}