import React, { useState, useEffect} from 'react';
import Tilt from 'react-tilt';

import './index.scss';

function Clock(props){

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [day, setDay] = useState('');
    const [date, setDate] = useState('');

    //STARTING COMPONENT EFFECT
    useEffect( () => {

        async function fetchData(){
            const response = await fetch('https://timezoneapi.io/api/timezone/?' + props.timezone + '&token=agWsJmlFvzmdrhYSamPR');
            const timeZoneData = await response.json();
            const data = timeZoneData.data;

            setSeconds(parseInt(data.datetime.seconds));
            setMinutes(parseInt(data.datetime.minutes));
            setHours(parseInt(data.datetime.hour_24_wolz));
            setDay(data.datetime.day_full);
            setDate(data.datetime.date);
        }

        const changeSeconds = function(){
            setSeconds(seconds => seconds + 1);
        }

        const secondsInterval = setInterval(changeSeconds, 1000);

        fetchData();

        return function cleanUp() {
            clearInterval(secondsInterval);
        }
    }, [props.timezone]);

    //UPDATING COMPONENT EFFECT
    useEffect(() => {
        if(seconds === 60){
            setMinutes(minutes + 1);
            setSeconds(0);
        }

        if(minutes === 60){
            setHours(hours + 1);
            setMinutes(0);
        }

        if(hours === 24){
            setHours(0);
        }
    }, [seconds, minutes, hours]);

    return(
        <Tilt className="clock-container" options={{max:10, scale:1}}>
            <div className="clock-background">
                <h3>{props.location}</h3>
                <h1>{String(hours).padStart(2, '0')} : {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}</h1>
                <h3>{day} {date}</h3>
            </div>
        </Tilt>
    )
}

export default Clock;