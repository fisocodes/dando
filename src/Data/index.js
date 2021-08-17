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
            isMounted: false,
            visibleClass: 'fade-out',
        }
    }

    showData(isVisible)
    {
        this.setState({
            isVisible: !isVisible,
            isMounted: true,
            visibleClass: isVisible ? 'fade-in' : 'fade-out',
        });
    }

    render()
    {
        return(
            <VisibilitySensor partialVisibility onChange={this.showData}>
                <table className={'dataTable ' + this.state.visibleClass}>
                    <tr>
                        <th>
                            <i className='material-icons dataIcon'>{this.props.icon}</i>
                            {this.props.title}
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <CountUp end={this.props.quantity} duration={Math.random() * 3 + 1} start={this.state.isVisible && !this.state.isMounted ? () => {} : null}/>  
                        </td>
                    </tr>  
                </table>
            </VisibilitySensor>
        );
    }
}

export default Data;