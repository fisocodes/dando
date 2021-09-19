import React, { Component } from 'react';
import { CircularProgress} from '@material-ui/core';

import './index.css';

class Loading extends Component{
    render(){
        return(
            <div className="loading-container">
                <h1>Loading D&amp;O</h1>
                <CircularProgress color='secondary'/>
            </div>
        );
    }
}

export default Loading;