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
import Arrow from '../Arrow';
import Footer from '../Footer';
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
                <TabContext value={this.state.value}>
                    <Tabs value={this.state.value} onChange={this.setValue} centered>        
                        <Tab value="0" label="Statistics"/>
                        <Tab value="1" label="Log In"/>
                        <Tab value="2" label="SignUp"/>    
                    </Tabs>
                    <TabPanel value="0">
                        <Login main={this.props.main}/>
                        <Header/>
                        <About/>
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
                                <h2>Statistics</h2>
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
                        <div id='statistics' className='statistics'>
                            
                        </div>
                        <Arrow/>
                        <Footer/>
                    </TabPanel> 
                    <TabPanel value="1">
                        <h1>Log In</h1>
                    </TabPanel> 
                    <TabPanel value="2">
                        <h1>Sign In</h1>
                    </TabPanel> 
                </TabContext>  
            </React.Fragment> 
        );
    }
}

export default Landing;