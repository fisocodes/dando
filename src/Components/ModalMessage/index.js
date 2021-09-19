import { Component } from 'react';
import { Modal } from '@material-ui/core';
import Typist from 'react-typist';

import Dust from '../Dust';
import Star from '../Star';
import store from '../../Core/Redux/Store';

import './index.css';

class ModalMessage extends Component{
    constructor(){
        super();

        this.state = {
            open: store.getState().modal.isOpen,
            message: store.getState().modal.message,
        }
    }

    setStateFromStore = () => {
        this.setState({
            open: store.getState().modal.isOpen,
            message: store.getState().modal.message,
        });
    }

    closeModal = () => {
        store.dispatch({type: 'modal/setIsOpen', payload: false});
    }

    componentDidMount(){
        store.subscribe(this.setStateFromStore);
    }

    render(){
        return(
            <Modal className="modal-container" open={this.state.open}>
                <>
                <div className="modal-background" onClick={this.closeModal}>
                    <Dust color="deeppink" gradID="1"/>
                    <Dust color="deeppink" gradID="1"/>
                    <Dust color="deeppink" gradID="1"/>
                    <Dust color="deeppink" gradID="1"/>
                    <Dust color="deeppink" gradID="1"/>
                    <Dust color="deeppink" gradID="1"/>
                    <Dust color="deeppink" gradID="1"/>
                    <Dust color="deeppink" gradID="1"/>
                    <Dust color="deepskyblue" gradID="2"/>
                    <Dust color="deepskyblue" gradID="2"/>
                    <Dust color="deepskyblue" gradID="2"/>
                    <Dust color="deepskyblue" gradID="2"/>
                    <Dust color="deepskyblue" gradID="2"/>
                    <Dust color="deepskyblue" gradID="2"/>
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                </div>
                <Typist className="modal-message" cursor={{show:false}} avgTypingDelay={90}>
                    <h1>{this.state.message}</h1>
                </Typist>
                </>
            </Modal>
        );
    }
}

export default ModalMessage;