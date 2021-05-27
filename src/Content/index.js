import React, {Component} from 'react';

import './index.css';

class Content extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className='content'>
                <div className='contentHeader'>
                    <div className='avatar'>
                        <img src={this.props.userpic} alt='Profile picture' className='userPic'/>
                        <div className='userName'>
                            {this.props.username}
                        </div>
                    </div>
                    <div className='contentDate'>
                        {this.props.date}
                    </div>
                    
                </div>
                <div className='contentData'>
                    {this.props.datatext ? 
                        <div className='contentDataText'>
                            {this.props.datatext}
                        </div>
                    : null}
                    {this.props.dataimage ?
                        <img src={this.props.dataimage} alt='Content image' className='contentDataImage'/>
                    :null}
                    {this.props.datavideo ?
                        <video className='contentDataVideo' controls>
                            <source src={this.props.datavideo}></source>
                        </video>
                    :null}
                </div>
            </div>
        );
    }
}

export default Content;