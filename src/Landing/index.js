import React, {Component} from 'react';
import Header from '../Header';
import Nav from '../Nav';
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
    render()
    {
        return(
            <React.Fragment>
                <Login main={this.props.main}/>
                <Nav/>
                <Header/>
                <About/>
                <div className="timeDiv">
                    <Clock location="Sydney" timezone="Australia/Sydney"/>
                    <Clock location="Ensenada" timezone="America/Tijuana"/>
                </div>
                <div className="weatherDiv">
                    <Weather city='Cabramatta' country='AU'/>
                    <Weather city='Ensenada' country='MX'/>
                </div>
                <div id='statistics' className='statistics'>
                    <Data icon='question_answer' icondesc='Messages icon' title='Messages' quantity='142252'/>
                    <Data icon='call' icondesc='Calls icon' title='Calls' quantity='45636'/>
                    <Data icon='image' icondesc='Photos icon' title='Photos' quantity='13421'/>
                    <Data icon='play_arrow' icondesc='Videos icon' title='Videos' quantity='69675'/>
                    <Data icon='article' icondesc='Posts icon' title='Posts' quantity='24634'/>
                    <Data icon='leaderboard' icondesc='Total icon' title='Total stuff' quantity='32535'/>
                </div>
                <Arrow/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default Landing;