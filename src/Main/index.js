import React, {Component} from 'react';
import {Switch, Route, NavLink} from 'react-router-dom';
import Star from '../Star';
import Feed from '../Feed';

import './index.css'

class Main extends Component{
    render(){
        return(
            <div>
                <nav className='mainNav'>
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                    <ul>
                        <li><NavLink to='/' exact={true}><i className='material-icons'>home</i></NavLink></li>
                        <li><NavLink to='/user'><i className='material-icons'>account_circle</i></NavLink></li>
                        <li><NavLink to='/album'><i className='material-icons'>photo_library</i></NavLink></li>
                        <li><NavLink to='/stats'><i className='material-icons'>bar_chart</i></NavLink></li>
                    </ul>
                </nav>
                <Switch>
                    <Route path='/user'>
                        <h1>USER</h1>
                    </Route>
                    <Route path='/album'>
                        <h1>ALBUM</h1>
                    </Route>
                    <Route path='/stats'>
                        <h1>STATS</h1>
                    </Route>
                    <Route path='/'>
                        <Feed/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default Main;