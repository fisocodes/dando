import React, {Component} from 'react';
import { HashRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReactDom from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import theme from './Theme';
import Main from './Main';

import './index.css';

const history = createBrowserHistory();

class App extends Component
{

    render()
    {
        return(
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <HashRouter>
                    <Main history={history}/>
                </HashRouter>  
            </ThemeProvider>
        );
    }
}
ReactDom.render(<App/>, document.getElementById("root"));