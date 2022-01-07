import { useState, useEffect } from 'react';
import './Modal.css';
import { login } from '../../../actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

const Modal = ({ handleClose, show }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passCheck, setPassCheck] = useState("");
    // Nayta salasana
    const [passShows, setPassShows] = useState(false);
    // Virheviestit
    const [showErr1, setShowErr1] = useState(false);
    const [showErr2, setShowErr2] = useState(false);
    const [showErr3, setShowErr3] = useState(false);
    const [matchErr, setMatchErr] = useState(false);

    const history = useHistory();

    // Silma-button salasanan nayttamiselle
    const togglePass = () => {
        setPassShows(passShows ? false : true);
    };

    // Kun kayttaja klikkaaa ruksia niin kentat ja virheviestit tyhjenee
    const clearInput = (e) => {
        setUsername("");
        setPassword("");
        setPassCheck("");
        setMatchErr(false);
        setShowErr1(false);
        setShowErr2(false);
        setShowErr3(false);
    }

    const dispatch = useDispatch();

    async function handleSubmit(e) {
        e.preventDefault();
        let payload = { username: username, password: password };

        if (username === "") {
            setShowErr1(true);
        }
        if (password === "") {
            setShowErr2(true);
        }
        if (passCheck === "") {
            setShowErr3(true)
        }
        if (password !== passCheck) {
            setMatchErr(true);
            setMatchErr(true);
            setShowErr1(false);
            setShowErr2(false);
            setShowErr3(false);
            setPassword("");
            setPassCheck("");
        }

        // Jos kaikki on vaaterissa niin jep
        if (username.length > 0 && password.length > 0 && passCheck.length > 0 && passCheck === password) {
            try {
                let res = await axios.post('http://localhost:5000/user_routes/adduser', payload);

                let data = res.data;
                console.log("ResData: ", data);
                if (data.message === "ei voi lisää käyttäjä jo olemassa") {
                    alert("Käyttäjätunnus on varattu!!");
                    setUsername("");
                    setPassword("");
                    setPassCheck("");
                }
                else {
                    dispatch(login(data.username, data.password));
                    setUsername("");
                    setPassword("");
                    setPassCheck("");
                    setMatchErr(false);
                    handleClose();
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className={showHideClassName}>
            <div className="modal-panel">
                <div className="modal-header">
                    <h1>Rekisteröidy</h1>
                    <button className="close-button" type="button" onClick={handleClose} onMouseDown={(e) => clearInput()}>
                        X
                    </button>
                </div>
                <form className="form-r">
                    <label className="label-modal">Haluamasi käyttäjätunnus:</label>
                    <br></br>
                    <input className="input-modal"
                        type="text"
                        value={username}
                        placeholder="Käyttäjätunnus"
                        onChange={(e) => setUsername(e.target.value)}
                        onInput={(e) => setShowErr1(false)}
                    />
                    {showErr1 ? <p className="msg">Syötä käyttäjätunnus</p> : ""}

                    <br></br>
                    <label className="label-modal">Salasana:</label>
                    <br></br>
                    <div className="passWrap">
                        <input className="input-modal"
                            type={passShows ? "text" : "password"}
                            value={password}
                            placeholder="Salasana"
                            onChange={(e) => setPassword(e.target.value)}
                            onInput={(e) => setShowErr2(false)}
                        />
                        <i class="fas fa-eye"
                            onClick={togglePass}></i>
                    </div>
                    {showErr2 ? <p className="msg">Syötä salasana</p> : ""}
                    <br></br>
                    <label className="label-modal">Salasana uudelleen:</label>
                    <br></br>
                    <div className="passWrap">
                        <input className="input-modal"
                            type={passShows ? "text" : "password"}
                            value={passCheck}
                            placeholder="Salasana uudelleen"
                            onChange={(e) => setPassCheck(e.target.value)}
                            onInput={(e) => setShowErr3(false)} />

                    </div>
                    {showErr3 ? <p className="msg"> Syötä salasana uudelleen</p> : ""}
                    <br></br>
                    {matchErr ? <p className="msg2">Syöttämäsi salasanat eivät täsmää!!</p> : ""}
                    <button type="submit" className="submit" onClick={(e) => handleSubmit(e)}>Rekisteröidy</button>
                </form>
            </div>
        </div>
    );
};

// Eli tama ottaa kaikki statet storesta ja muuntaa ne propseiksi joita voidaan kayttaa ylla
// Aina kun redux statet muuttuu niin taman pitaisi juosta uudelleen
const mapStateToProps = (state) => {

    console.log("nyt ollaan mapissa MODAL tulosta state: ", state.user);
    return { user: state.user };
}

// Tama tassa a) saa tiedon providerilta, etta kirjautumistiedot ovat muuttuneet
// Ja b) login(key) : login(action creator)
export default connect(mapStateToProps, { login })(Modal);