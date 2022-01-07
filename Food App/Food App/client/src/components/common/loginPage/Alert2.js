import { useState } from 'react';
import './Alert2.css';


const Alert2 = ({ handleClose, show }) => {


    return (
        <div className="container-alert2">
            <button className="button-alert2" onClick={handleClose}><i class="fas fa-times-circle"></i></button>
            <p className="message-alert2">
                Käyttäjänimi tai salasana väärin!</p>
        </div>
    );
};

export default Alert2;