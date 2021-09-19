import React, {Component} from 'react';
import Accordion from '@material-ui/core/Accordion';
import { AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Header from '../../Components/Header';
import Data from '../../Components/Data';
import About from '../../Components/About';
import Clock from '../../Components/Clock';
import Weather from '../../Components/Weather';

import './index.css';

class Overview extends Component
{

    constructor(){
        super();
        this.state = {
            value: "0",
        };
    }

    setValue = (event, newValue) => {
        this.setState({
            value: newValue,
        });
    }
    
    render()
    {
        return(
            <React.Fragment>
                <Header/>
                <About/>
                <div className='accordion-section'>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <h2>Time</h2>
                        </AccordionSummary>
                        <AccordionDetails className="timeDiv">
                            <Clock location="Sydney" timezone="Australia/Sydney"/>
                            <Clock location="Ensenada" timezone="America/Tijuana"/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <h2>Weather</h2>
                        </AccordionSummary>
                        <AccordionDetails className="weatherDiv">
                            <Weather city='Cabramatta' country='AU'/>
                            <Weather city='Ensenada' country='MX'/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <h2>Overview</h2>
                        </AccordionSummary>
                        <AccordionDetails className="statistics">
                            <Data icon='question_answer' icondesc='Messages icon' title='Messages' quantity='142252'/>
                            <Data icon='call' icondesc='Calls icon' title='Calls' quantity='45636'/>
                            <Data icon='image' icondesc='Photos icon' title='Photos' quantity='13421'/>
                            <Data icon='play_arrow' icondesc='Videos icon' title='Videos' quantity='69675'/>
                            <Data icon='article' icondesc='Posts icon' title='Posts' quantity='24634'/>
                            <Data icon='leaderboard' icondesc='Total icon' title='Total stuff' quantity='32535'/>
                        </AccordionDetails>
                    </Accordion>
                </div> 
            </React.Fragment> 
        );
    }
}

export default Overview;