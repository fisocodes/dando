import React, {Component} from 'react';
import './index.css';

class Data extends Component
{
    constructor()
    {
        super();
        this.isInViewport = this.isInViewport.bind(this);
        this.showData = this.showData.bind(this);
        window.addEventListener("scroll", this.showData);
    }

    showData()
    {
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
            <table className='dataTable'>
                <tr>
                    <th>
                        <img src={this.props.icon} alt={this.props.icondesc}></img>
                        {this.props.title}
                    </th>
                </tr>
                <tr>
                    <td>{this.props.quantity}</td>
                </tr>  
            </table>
        );
    }
}

export default Data;