import React, {Component} from 'react';
import './index.css';

class Uploader extends Component{
    render(){
        return(
            <form className='uploadForm'>
                <input className='textForm' type='text' placeholder='How is it going?'></input>
                <input className='fileButton' type='file' accept='image/*,video/*'></input>
            </form>
        );
    }
}

export default Uploader;