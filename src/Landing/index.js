import React, {Component} from 'react';
import Accordion from '@material-ui/core/Accordion';
import { AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Carousel from 'react-material-ui-carousel';

import Header from '../Header';
import Data from '../Data';
import About from '../About';
import Clock from '../Clock';
import Weather from '../Weather';
import Content from '../Content';

import './index.css';

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
                <Carousel className="landing-carousel">
                    <Content username="Deborah Chan" userpic="https://scontent.ftij3-1.fna.fbcdn.net/v/t1.18169-9/575681_108819125982220_124974326_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=LnjynaU7oHsAX-REiKZ&_nc_ht=scontent.ftij3-1.fna&oh=404f1ae7544aec473194b6d898f37bbf&oe=61529BC7" date="16/12/2020" datatext="Today is my birthday!!!... Whatever"/>
                    <Content username="Oscar Figueroa" userpic="https://scontent.ftij3-1.fna.fbcdn.net/v/t1.6435-9/118855829_1190851211290913_7150096692545198690_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=odIpNqCSWY0AX9MiLM_&_nc_ht=scontent.ftij3-1.fna&oh=dc69b546099b11494bdff910a44e10be&oe=6151EA73" date="16/12/2020" datatext="Today was Deborah's birthday... Whatever"/>
                    <Content username="Deborah Chan" userpic="https://scontent.ftij3-1.fna.fbcdn.net/v/t1.18169-9/575681_108819125982220_124974326_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=LnjynaU7oHsAX-REiKZ&_nc_ht=scontent.ftij3-1.fna&oh=404f1ae7544aec473194b6d898f37bbf&oe=61529BC7" date="16/12/2020" datatext="I posted this bc, why not?" dataimage="https://scontent.ftij3-1.fna.fbcdn.net/v/t1.18169-9/26090_102375736468146_7348343_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=de6eea&_nc_ohc=uB8vKmtFF5YAX-kuj7m&_nc_ht=scontent.ftij3-1.fna&oh=683721b66199df001672178f8fd07543&oe=61531F1A"/>
                    <Content username="Oscar Figueroa" userpic="https://scontent.ftij3-1.fna.fbcdn.net/v/t1.6435-9/118855829_1190851211290913_7150096692545198690_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=odIpNqCSWY0AX9MiLM_&_nc_ht=scontent.ftij3-1.fna&oh=dc69b546099b11494bdff910a44e10be&oe=6151EA73" date="16/12/2020" datatext="A cutie... 🦙" datavideo="https://cdn.videvo.net/videvo_files/video/free/2014-07/large_watermarked/Alpaca_1_preview.mp4"/>
                </Carousel>
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