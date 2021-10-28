import React, {Component} from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

import './index.scss';

class Data extends Component
{
    constructor()
    {
        super();
        this.showData = this.showData.bind(this);
        this.state = {
            isVisible: false,
            countedTimes: 0,
            visibleClass: 'fade-out',
            duration: Math.random() * 3 + 1,
            visibilityFires: 1,
        }
    }

    showData(isVisible)
    {
        this.setState((prevState) => {
            return{
                isVisible: !isVisible,
                visibleClass: isVisible ? 'fade-in' : 'fade-out',
                visibilityFires: prevState.visibilityFires + 1,
            }
        });
    }

    render()
    {
        return(
            <VisibilitySensor partialVisibility offset={{top:10, bottom:10}} onChange={this.showData}>
                <table className={'data-table ' + this.state.visibleClass}>
                    <tbody>
                        <tr>
                            <th>
                                <i className='material-icons data-icon'>{this.props.icon}</i>
                                {this.props.title}
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <CountUp end={this.props.quantity} redraw={false} separator="," duration={this.state.duration} start={this.state.isVisible && this.state.visibilityFires < 3 ? () => {} : null}/>  
                            </td>
                        </tr>  
                    </tbody>
                </table>
            </VisibilitySensor>
        );
    }
}

export default Data;