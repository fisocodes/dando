import React, {Component} from 'react';

import './index.css';

class Clock extends Component{

    constructor(props){
        super(props);
        this.state = {
            hour: 0,
            minutes: 0,
            seconds: 0,
            day: '',
            date: ''
        }
    }

    async componentDidMount(){
        const response = await fetch('https://timezoneapi.io/api/timezone/?' + this.props.timezone + '&token=agWsJmlFvzmdrhYSamPR');
        const timeZoneData = await response.json();
        const data = timeZoneData.data;
        this.setState({
            hour: parseInt(data.datetime.hour_24_wolz),
            minutes: parseInt(data.datetime.minutes),
            seconds: parseInt(data.datetime.seconds),
            day: data.datetime.day_full,
            date: data.datetime.date
        });

        const clock = this;
        setInterval(function(){
            clock.setState({
                seconds: clock.state.seconds + 1
            });
        }, 1000);
    }

    componentDidUpdate(){
        if(this.state.seconds == 60){
            this.setState({
                minutes: this.state.minutes + 1,
                seconds: 0,

            });
        }

        if(this.state.minutes == 60){
            this.setState({
                hour: this.state.hour + 1,
                minutes: 0
            });
        }

        if(this.state.hour == 24){
            this.setState({
                hour: 0
            });
        }
    }

    render(){
        return(
            <div className='clockContainer'>
                <h3>{this.props.location}</h3>
                <h3>{this.state.hour} : {this.state.minutes} : {this.state.seconds}</h3>
                <h3>{this.state.day} {this.state.date}</h3>
            </div>
        );
    }
}

export default Clock;