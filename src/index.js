import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDom from 'react-dom';
import Main from './Main';
import Arrow from './Arrow';

class App extends Component
{
    render()
    {
        return(
            <BrowserRouter>
                <Main/>
                <Arrow/>
            </BrowserRouter>  
        );
    }
}
ReactDom.render(<App/>, document.getElementById("root"));