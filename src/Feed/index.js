import React, {Component} from 'react';
import Uploader from '../Uploader';
import Clock from '../Clock';

import './index.css';

class Feed extends Component{
    render(){
        return(
            <div className='feedContainer'>
                <div className='timeDiv'>
                    <h2>Time</h2>
                    <Clock location='Sydney' timezone='Australia/Sydney'/>
                    <Clock location='Ensenada' timezone='America/Tijuana'/>
                </div>
                <div className='feedDiv'>
                    <h2>Feed</h2>
                    <Uploader/>
                    word word word word word word <br></br>word word word word word word <br></br>word word word word word <br></br>word word word word word word <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                </div>
                <div className='chatDiv'>
                    <h2>Chat</h2>
                </div>
            </div>
        );
    }
}

export default Feed;