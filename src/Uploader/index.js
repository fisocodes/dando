import React, {Component} from 'react';
import './index.css';

class Uploader extends Component{
    render(){
        return(
            <form className='uploadForm'>
                <input className='textForm' type='text' placeholder='How is it going?'></input>
                <input id='fileInput' className='fileButton' type='file' accept='image/*,video/*' multiple></input>
                <label className='inputButtonLabel' for='fileInput'>Photo/Video</label>
            </form>
        );
    }
}

export default Uploader;