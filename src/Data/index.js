import React, {Component} from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

import './index.css';

class Data extends Component
{
    constructor()
    {
        super();
        this.isInViewport = this.isInViewport.bind(this);
        this.showData = this.showData.bind(this);
        this.state = {
            isVisible: false,
        }
    }

    showData(isVisible)
    {
        this.setState({
            isVisible: isVisible ? true : false,
        });
        let datas = document.getElementsByClassName("dataTable");

        for(let i=0; i<datas.length; i++)
        {
            if(this.isInViewport(datas[i]))
            {
                datas[i].style.opacity = "1.0";
            }
            else
            {
                datas[i].style.opacity = "0.0";
            }
        }
    }

    isInViewport(element)
    {
        const rect = element.getBoundingClientRect();
        return(
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    render()
    {
        return(
            <VisibilitySensor onChange={this.showData} offset={{top: 20, bottom: 20}}>
                <table className='dataTable'>
                    <tr>
                        <th>
                            <i className='material-icons dataIcon'>{this.props.icon}</i>
                            {this.props.title}
                        </th>
                    </tr>
                    <tr>
                        <td>
                        {   
                            this.state.isVisible ? <CountUp end={this.props.quantity}  duration={Math.random() * 4 + 1}/> : null  
                        }
                        </td>
                    </tr>  
                </table>
            </VisibilitySensor>
        );
    }
}

export default Data;