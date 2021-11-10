import { useEffect, useState } from 'react';
import { Modal } from '@material-ui/core';
import Typist from 'react-typist';

import Dust from '../Dust';
import Star from '../Star';

import './index.scss';

function ModalError(props){
    const [open, setOpen] = useState(true);

    return(
        <Modal className="modal-error-container" onClick={() => setOpen(false)} open={open}>
        <>
            <div className="modal-error-background">
                <Dust color="orange" gradID="1"/>
                <Dust color="orange" gradID="1"/>
                <Dust color="orange" gradID="1"/>
                <Dust color="orange" gradID="1"/>
                <Dust color="orange" gradID="1"/>
                <Dust color="orange" gradID="1"/>
                <Dust color="orange" gradID="1"/>
                <Dust color="orange" gradID="1"/>
                <Dust color="red" gradID="2"/>
                <Dust color="red" gradID="2"/>
                <Dust color="red" gradID="2"/>
                <Dust color="red" gradID="2"/>
                <Dust color="red" gradID="2"/>
                <Dust color="red" gradID="2"/>
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
            <Typist className="modal-error-message" cursor={{show:false}} avgTypingDelay={90}>
                <h1>{props.message}</h1>
            </Typist>
            <h4 className="modal-error-submessage">Tap or click anywhere to close</h4>
        </>
    </Modal>
    );
}

export default ModalError;