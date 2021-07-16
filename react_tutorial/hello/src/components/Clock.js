import React, { Component } from "react";

class Clock extends Component{

    constructor(props) {
        super(props);
        this.state = {
            date : new Date()
        };
    }

    //추가
    componentDidMount() {
        this.timer = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState(
            {date : new Date()}
        )
    }


    render() {
        return (
            <div>
                <h2> 현재 시간은 ?? </h2>
                <div>{ this.state.date.toLocaleTimeString() }</div>
            </div>
        );
    }
}

export { Clock }