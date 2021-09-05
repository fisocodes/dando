import React, {Component} from 'react';
import { HashRouter } from 'react-router-dom';
import ReactDom from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { Fab } from '@material-ui/core';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import Plx from 'react-plx/lib/Plx';

import theme from './Theme';
import Main from './Main';

import './index.css';

class App extends Component
{
    render()
    {
        const parallaxData = [
            {
              start: 400,
              end: 500,
              properties: [
                {
                  startValue: 0.0,
                  endValue: 1.0,
                  property: 'scale',
                },
              ],
            },
          ];

        return(
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <HashRouter refresh>
                    <Main/>
                    <Plx parallaxData={parallaxData} className="fab-showing">
                        <Fab color="secondary" size="small" onClick={() => window.scrollTo(0,0)}>
                            <KeyboardArrowUpRoundedIcon/>
                        </Fab>  
                    </Plx>
                </HashRouter>
            </ThemeProvider>
        );
    }
}
ReactDom.render(<App/>, document.getElementById("root"));