import React, {Component} from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

import './index.css';

class Data extends Component
{
    constructor()
    {
        super();
        this.showData = this.showData.bind(this);
        this.state = {
            isVisible: false,
            visibleClass: 'fade-out',
            duration: Math.random() * 3 + 1,
        }
    }

    showData(isVisible)
    {
        this.setState(
            {
                isVisible: !isVisible,
                visibleClass: isVisible ? 'fade-in' : 'fade-out',
            }
        );
    }

    render()
    {
        return(
            <VisibilitySensor partialVisibility onChange={this.showData}>
                <table className={'dataTable ' + this.state.visibleClass}>
                    <tr>
                        <th>
                            <i className='material-icons data-icon'>{this.props.icon}</i>
                            {this.props.title}
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <CountUp end={this.props.quantity} separator="," duration={this.state.duration} start={this.state.isVisible ? () => {}: null}/>  
                        </td>
                    </tr>  
                </table>
            </VisibilitySensor>
        );
    }
}

export default Data;