import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDom from 'react-dom';
import Main from './Main';

class App extends Component
{
    render()
    {
        return(
            <BrowserRouter>
                <Main/>
            </BrowserRouter>  
        );
    }
}
ReactDom.render(<App/>, document.getElementById("root"));