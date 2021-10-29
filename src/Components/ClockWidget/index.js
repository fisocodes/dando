import Tilt from 'react-tilt';
import Clock from 'react-live-clock';

import './index.scss';

function ClockWidget(props){

    return(
        <Tilt className="clock-container" options={{max:10, scale:1}}>
            <div className="clock-background">
                <h3>{props.location}</h3>
                <Clock format={'h:mm:ss A'} ticking={true} timezone={props.timezone} style={{fontSize: '2rem'}}/>
                <Clock format={'dddd DD/MM/YYYY'} ticking={true} timezone={props.timezone}/>
            </div>
        </Tilt>
    )
}

export default ClockWidget;