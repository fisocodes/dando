import React, {Component} from 'react';

import './index.css';

class Widget extends Component{

    constructor(props){
        super(props);
        this.state = {
            class: 'widgetContainerClosed'
        }

        this.toggleWidget = this.toggleWidget.bind(this);
    }

    toggleWidget(){
        if(this.state.class === 'widgetContainerClosed'){
            this.setState({
                class: 'widgetContainerOpened'
            });
        }
        else{
            this.setState({
                class: 'widgetContainerClosed'
            });
        }
    }

    render(){
        return(
            <div className={this.state.class} onClick={this.toggleWidget} style={{top: this.props.top}}>
                <div className='widgetWrapper'>
                    {this.state.class !== 'widgetContainerClosed' ?
                         this.props.content.map(function(element){
                            return element;
                        }) :
                        <i className='material-icons'>{this.props.icon}</i>
                   }
                </div>
            </div>
        );
    }
}

export default Widget;