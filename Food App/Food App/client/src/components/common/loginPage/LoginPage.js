import React, { Component } from 'react';
import './LoginPage.css';
import { connect } from 'react-redux';
import { login } from '../../../actions';
import { logout } from '../../../actions';
import Modal from './Modal';
import Alert2 from './Alert2';
import { Container, Form, Button, FormField } from 'semantic-ui-react';



class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            enteredUsername: "",
            password: "",
            show: false,
            show2: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showModal2 = this.showModal2.bind(this);
        this.hideModal2 = this.hideModal2.bind(this);

    }
    // Tassa on otettu kiinni se, jos kannan kayttajatarkistus palauttaa 
    // ei kayttajaa virheen
    componentDidUpdate(prevProps) {
        // eli jos kayttajatunnus on muuttunut niin
        if (this.props.user.username !== prevProps.user.username) {
            // tsiigataan ilmoittaako message virheesta
            // jos messagee ei tule niin kirjautuminen on onnistunut
            if (this.props.user.message !== undefined) {
                this.showModal2();
                console.log("Valitulostus: ", this.props.user.message);
                //Heitetaan logout valiin niin homma toimii useammankin kerran perakkain
                console.log("BUGFIX: ", this.props.user);
                this.props.logout();
            }
            // jos paluuarvot ei nullia niin kirjautuminen onnistunut
            else if (this.props.user.username !== null && this.props.user.userID !== null) {
                this.props.history.push('/');
            }
        }

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    //REKIStEROITYMISIKKUNA
    showModal = () => {

        this.setState({ show: true });
    };

    hideModal = () => {

        this.setState({ show: false });
    };
    // ALERTTI
    showModal2 = () => {

        this.setState({ show2: true });
    };

    hideModal2 = () => {

        this.setState({ show2: false });
    };

    handleSubmit(e) {
        e.preventDefault();
        const { enteredUsername, password } = this.state;
        // Tasta mennaan action creatoriin ja tehdaan API-kutsu siella
        try {
            this.props.login(this.state.enteredUsername, this.state.password);

        } catch (error) {
            console.log(error);
        }
        this.setState({ enteredUsername: "", password: "" });

    }

    render() {
        return (

            <Container className="container-loginpage">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label className="labels">Käyttäjätunnus</label>
                        <br></br>
                        <input className="inputs" type="enteredUsername"
                            name="enteredUsername"
                            placeholder="Käyttäjätunnus"
                            value={this.state.enteredUsername}
                            onChange={this.handleChange}
                            required />
                    </Form.Field>
                    <Form.Field>
                        <label className="labels">Salasana</label>
                        <br></br>
                        <input className="inputs" type="password"
                            name="password"
                            placeholder="Salasana"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required />
                    </Form.Field>
                    <Button className="button-login" type="submit">Kirjaudu sisään</Button>
                    { //Kirjautunut : ei kirjautunut
                        (this.props.user.username === null)
                            ? <Form.Field>
                                <p>Eikö sinulla ole vielä tiliä? Luo tili
                            <Button className="button-register" type="button" onClick={this.showModal}>TÄSTÄ!</Button> </p>
                            </Form.Field>
                            :
                            <FormField>
                                <p>Olet jo kirjautunut sisään</p>
                            </FormField>
                    }

                </Form>
                < Modal show={this.state.show} handleClose={this.hideModal} />

                {this.state.show2
                    ? < Alert2 show={this.state.show} handleClose={this.hideModal2} />
                    : <div> </div>
                }

            </Container >
        );
    }
}


// Eli tama ottaa kaikki statet storesta ja muuntaa ne propseiksi joita voidaan kayttaa ylla
// Aina kun redux statet muuttuu niin taman pitaisi juosta uudelleen
const mapStateToProps = (state) => {
    console.log("nyt ollaan mapissa LOGINPAGE tulosta state: ", state);
    return { user: state.user };
}

// Tama tassa a) saa tiedon providerilta, etta kirjautumistiedot ovat muuttuneet
// Ja b) login(key) : login(action creator)
export default connect(mapStateToProps, { login, logout })(LoginPage);