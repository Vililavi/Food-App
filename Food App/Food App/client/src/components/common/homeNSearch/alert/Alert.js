import { useState } from 'react';
import './Alert.css';


const Alert = (props) => {

    return (
        <div className="container-alert">
            <button className="button-alert" onClick={(e) => props.handleShow(false)}><i class="fas fa-times-circle"></i></button>
            <p className="message-alert">
                Voi rähmä, ei hakutuloksia!</p>
        </div>
    );
};

export default Alert;