import React, {Component} from 'react';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import ReactDom from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import theme from './Theme';
import './index.css';
import Main from './Main';

class App extends Component
{
    render()
    {
        return(
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <HashRouter>
                    <Main/>
                </HashRouter>  
            </ThemeProvider>
        );
    }
}
ReactDom.render(<App/>, document.getElementById("root"));