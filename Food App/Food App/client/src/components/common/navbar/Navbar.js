import React, { useState } from 'react';
import './Navbar.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../actions';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";


const Navbar = ({ user }) => {

    const history = useHistory();

    // Haitarivalikolle
    const [klikki, setKlikki] = useState(false);
    const handleClick = () => setKlikki(!klikki);

    const dispatch = useDispatch();

    const click = () => {
        console.log("Kirjaudutaan ulos:")
        dispatch(logout());
        history.push('/');
    }

    return (

        <nav className="NavbarItems">
            <p className="navbar-logo" > <i className="fas fa-carrot"> </i>Ruoka-Appi</p>
            <div className="menu-icon" onClick={handleClick}>
                <i className={klikki ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <div className="loggedIn">
                { //Kirjautunut : ei kirjautunut
                    (user === null || user === undefined)
                        ? <div> </div>
                        :
                        <div>
                            <p className="tervetuloa">Hei {user}, tervetuloa takaisin!</p>
                        </div>
                }
            </div>
            <ul className={klikki ? 'nav-menu active' : 'nav-menu'}>
                <li>
                    <Link to='/' className="nav-links"> Etusivu</Link>
                </li>
                { // Kirjautunut : ei kirjautunut - nayta profiilitabi
                    (user === null || user === undefined)
                        ? <li></li>
                        :
                        <li>
                            <Link to='/Reseptini' className="nav-links"> Reseptini</Link>
                        </li>

                }

                { //Kirjautunut : ei kirjautunut - nayta sisaan-/uloskirjaus tabit
                    (user === null || user === undefined)
                        ? <li >
                            <Link className="nav-links" to='/Kirjaudu' > Kirjaudu</Link>
                        </li>
                        :
                        <li>
                            <button className="logout" onClick={(e) => click(e.target.value)}>Kirjaudu ulos</button>
                        </li>
                }
            </ul>
        </nav>
    )
};

// Eli tama ottaa kaikki statet storesta ja muuntaa ne propseiksi joita voidaan kayttaa ylla
// Aina kun redux statet muuttuu niin taman pitaisi juosta uudelleen
const mapStateToProps = (state) => {
    console.log("nyt ollaan mapissa Navbar tulosta state: ", state);
    return { user: state.user.username };
}

// Tama tassa a) saa tiedon providerilta, etta kirjautumistiedot ovat muuttuneet
// Ja b) login(key) : login(action creator)
export default connect(mapStateToProps, {})(Navbar);

