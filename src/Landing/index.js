import React, {Component} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';
import Accordion from '@material-ui/core/Accordion';
import { AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Header from '../Header';
import Login from '../Login';
import Data from '../Data';
import About from '../About';
import Clock from '../Clock';
import Weather from '../Weather';

import './index.css'

class Landing extends Component
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

export default Landing;