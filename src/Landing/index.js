import React, {Component} from 'react';
import Header from '../Header';
import Nav from '../Nav';
import Login from '../Login';
import Arrow from '../Arrow';
import Footer from '../Footer';
import Data from '../Data';
import About from '../About';

import './index.css'

class Landing extends Component
{
    render()
    {
        return(
            <React.Fragment>
                <Login/>
                <Nav/>
                <Header/>
                <About/>
                <div id='statistics' className='statistics'>
                    <Data icon='./messages.png' icondesc='Messages icon' title='Messages' quantity='142252'/>
                    <Data icon='./calls.png' icondesc='Calls icon' title='Calls' quantity='45636'/>
                    <Data icon='./photos.png' icondesc='Photos icon' title='Photos' quantity='13421'/>
                    <Data icon='./videos.png' icondesc='Videos icon' title='Videos' quantity='69675'/>
                    <Data icon='./posts.png' icondesc='Posts icon' title='Posts' quantity='24634'/>
                    <Data icon='./total.png' icondesc='Total icon' title='Total stuff' quantity='32535'/>
                </div>
                <Arrow/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default Landing;