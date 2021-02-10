import React from 'react';
import './App.css';


export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        var time = new Date();

        var hours = (time.getHours() < 10 ? '0' : '') + time.getHours();
        var minutes = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
        var seconds = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds();

        this.state = {time: hours + ':' + minutes + ':' + seconds,
            class: '',
            isClockDisplayed: true,
            isTextDisplayed: false
        };
    }

    componentDidMount() {
        this.clockInterval = setInterval(() => {
            var time = new Date();

            var hours = (time.getHours() < 10 ? '0' : '') + time.getHours();
            var minutes = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
            var seconds = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds();

            if(seconds === '00') {
                this.setState({class: 'newMinute'});
                this.classInterval = setInterval(() => {
                    this.setState({class: ''});
                    clearInterval(this.classInterval);
                }, 3000);
            }

            this.setState({time: hours + ':' + minutes + ':' + seconds});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.clockInterval);
    }

    showClockHandler = () => {
        this.setState({
            isClockDisplayed: !this.state.isClockDisplayed
        })
    }
    showTextHandler = () => {
        this.setState({
            isTextDisplayed: !this.state.isTextDisplayed
        })
    }
    render() {
        return (
            <>
                <div className="Clock" style={{display: this.state.isClockDisplayed ? "block":"none"}}>
                    <span>What time is it?</span>
                    <br/>
                    <h1 className={this.state.class}>{ this.state.time }</h1>
                </div>
                <button onClick={this.showClockHandler}>Show/Hide</button>
                <button onClick={this.showTextHandler}>Skip this year</button>
                <div id="textToShow" style={{display: this.state.isTextDisplayed ? "block":"none"}}>
                    <p>Skipping Corona!</p>
                </div>
            </>
        )
    }
}
