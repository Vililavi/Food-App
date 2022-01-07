import React, { Component, useState } from 'react';
import './Pantry.css';
import axios from 'axios';
import { connect } from 'react-redux';
import UsersRecipes from './UsersRecipes';

class Pantry extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            paivita: 0,
            errors: {},
            ingredients: [
                {
                    /// nimi: makkara nuero:600
                }
            ],
            ingredientsfinal:
            {
                //makkara:600
            },
        };
        //TAMA!!!!
        this.handleChangeNimi = this.handleChangeInputs.bind(this);

    }


    lisaaRuokaa(b) {
        b.preventDefault();
        this.setState({ ingredients: [...this.state.ingredients, {}] })
    }

    handleChangeB(b, ingredient) {
        console.log("TESRTIÖKLKÖKÖK", b.target.value);
        this.state.ingredients[ingredient] = b.target.value

        //this.setState({ingredients: this.state.ingredients})
        this.setState({ ingredients: { [this.state.ingredients.nimi]: [this.state.ingredients.numero] } })
    }

    handleRemove(ingredient) {

        this.state.ingredients.splice(ingredient, 1)
        this.setState({ ingredients: this.state.ingredients })

    }




    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //NAME
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Kenttä ei voi olla tyhjä!";
        }
        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["name"] = "Vain kirjaimia!";
            }
        }
        console.log("TESTI NIMI: ", this.state.fields["name"]);

        //COUNTRY
        if (!fields["country"]) {
            formIsValid = false;
            errors["country"] = "Kenttä ei voi olla tyhjä!";
        }

        if (typeof fields["country"] !== "undefined") {
            if (!fields["country"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["country"] = "Vain kirjaimia!";
            }
        }
        console.log("TESTI MAA: ", this.state.fields["country"]);

        //SERVING
        if (!fields["serving"]) {
            formIsValid = false;
            errors["serving"] = "Kenttä ei voi olla tyhjä!";
        }
        //tähän numeromuunnos
        var ser = this.state.fields["serving"];
        parseInt(ser);
        console.log("TESTI ANNOS KOKO: ", ser);

        //TIME
        if (!fields["time"]) {
            formIsValid = false;
            errors["time"] = "Kenttä ei voi olla tyhjä!";
        }
        //numeromuunnos
        var tim = this.state.fields["time"];
        parseInt(tim);
        console.log("TESTI AIKA: ", tim);

        //DIFFICULTY
        if (!fields["difficulty"]) {
            formIsValid = false;
            errors["difficulty"] = "Kenttä ei voi olla tyhjä!";
        }
        //numeromuunnos
        var dif = this.state.fields["difficulty"];
        parseInt(dif);
        console.log("TESTI VAIKEUS: ", dif);

        //TYPE
        if (!fields["type"]) {
            formIsValid = false;
            errors["type"] = "Kenttä ei voi olla tyhjä!";
        }
        console.log("TESTI TYYPPI", this.state.fields["type"]);

        //MAININGREDIENT
        if (!fields["mainingredient"]) {
            formIsValid = false;
            errors["mainingredient"] = "Kenttä ei voi olla tyhjä!";
        }
        if (typeof fields["mainingredient"] !== "undefined") {
            if (!fields["mainingredient"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["mainingredient"] = "Vain kirjaimia!";
            }
        }
        console.log("TESTI PÄÄRAAKA-AINE", this.state.fields["mainingredient"]);

        //TEXT
        if (!fields["text"]) {
            formIsValid = false;
            errors["text"] = "Kenttä ei voi olla tyhjä!";
        }
        console.log("TESTI VALMISTUS", this.state.fields["text"]);

        //JULKINEN
        if (!fields["public"]) {
            formIsValid = false;
            errors["public"] = "Kenttä ei voi olla tyhjä!";
        }
        console.log("TESTI JULKINEN", this.state.fields["public"]);

        //GLUTEENITON
        if (!fields["glutenfree"]) {
            formIsValid = false;
            errors["glutenfree"] = "Kenttä ei voi olla tyhjä!";
        }
        console.log("TESTI GLUTEENITON", this.state.fields["glutenfree"]);

        //LAKTOOSITON
        if (!fields["lactosefree"]) {
            formIsValid = false;
            errors["lactosefree"] = "Kenttä ei voi olla tyhjä!";
        }
        console.log("TESTI LAKTOOSITON", this.state.fields["lactosefree"]);

        //MAIDOTON
        if (!fields["milkfree"]) {
            formIsValid = false;
            errors["milkfree"] = "Kenttä ei voi olla tyhjä!";
        }
        //if (String(a).toLowerCase() == "true") kokeile tätä jos noi ei lue tuota true/falsee tässä
        console.log("TESTI MAIDOTON", this.state.fields["milkfree"]);

        //MUNATON
        if (!fields["eggfree"]) {
            formIsValid = false;
            errors["eggfree"] = "Kenttä ei voi olla tyhjä!";
        }
        //if (String(a).toLowerCase() == "true") kokeile tätä jos noi ei lue tuota true/falsee tässä
        console.log("TESTI MUNATON", this.state.fields["eggfree"]);

        //VEGAN
        if (!fields["vegan"]) {
            formIsValid = false;
            errors["vegan"] = "Kenttä ei voi olla tyhjä!";
        }
        //if (String(a).toLowerCase() == "true") kokeile tätä jos noi ei lue tuota true/falsee tässä
        console.log("TESTI VEGAANI", this.state.fields["vegan"]);

        //RAAKA-AINE

        this.setState({ errors: errors });
        return formIsValid;
    }
    contactSubmit(e) {
        e.preventDefault();
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }
    // TAMA!!!!
    handleChangeInputs(index, evt) {

        console.log(evt.target.value);

        const values = [...this.state.ingredients];
        values[index][evt.target.name] = evt.target.value;
        this.setState({ ingredients: values });

        console.log(this.state.ingredients);
    }

    // TAALLA LOOPATAAN INGREDIENTS INGREDIENTS ObJEKTIIN
    async handleButtonClicked() {

        console.clear();

        for (const ingredient of this.state.ingredients) {
            console.log("TESTI: ", ingredient.nimi, ingredient.numero, ingredient.peraliite);
            this.state.ingredientsfinal[ingredient.nimi] = ingredient.numero + ingredient.peraliite;
        }

        if (this.state.fields["vegan"] === "true") {
            this.state.fields["vegan"] = true;
        }
        else {
            this.state.fields["vegan"] = false;
        }
        if (this.state.fields["glutenfree"] === "true") {
            this.state.fields["glutenfree"] = true;
        }
        else {
            this.state.fields["glutenfree"] = false;
        }
        if (this.state.fields["lactosefree"] === "true") {
            this.state.fields["lactosefree"] = true;
        }
        else {
            this.state.fields["lactosefree"] = false;
        }
        if (this.state.fields["milkfree"] === "true") {
            this.state.fields["milkfree"] = true;
        }
        else {
            this.state.fields["milkfree"] = false;
        }
        if (this.state.fields["eggfree"] === "true") {
            this.state.fields["eggfree"] = true;
        }
        else {
            this.state.fields["eggfree"] = false;
        }
        if (this.state.fields["public"] === "true") {
            this.state.fields["public"] = true;
        }
        else {
            this.state.fields["public"] = false;
        }

        console.log(this.state);
        console.log("USER TESTI : ", this.props.user.userID);

        // POSTI
        try {
            const response = await axios.post(
                "http://localhost:5000/recipe_routes/addrecipe", {

                user_id: this.props.user.userID,
                public: this.state.fields["public"],
                name: this.state.fields["name"],
                country: this.state.fields["country"],
                serving: this.state.fields["serving"],
                time: this.state.fields["time"],
                difficulty: this.state.fields["difficulty"],
                type: this.state.fields["type"],
                glutenfree: this.state.fields["glutenfree"],
                lactosefree: this.state.fields["lactosefree"],
                eggfree: this.state.fields["eggfree"],
                milkfree: this.state.fields["milkfree"],
                vegan: this.state.fields["vegan"],
                mainingredient: this.state.fields["mainingredient"],
                ingredient: this.state.ingredientsfinal,
                text: this.state.fields["text"]

            })
            this.setState(prevState => {
                return { paivita: prevState.paivita + 1 }
            })
            if (response.data.message) {
                alert("Reseptin lisäys ei onnistunut, tarkista kentät!")
            }
            else {
                alert("Reseptin lisäys onnistui!");
            }

        } catch (error) {
            console.log("Jotain kosahtaa: ", error);
            alert("Reseptin lisäys EI onnistunut! Tarkista, että jokainen kenttä on täytetty!");
        }

        this.props.history.push('/');
        this.props.history.push('/Reseptini')

    }

    render() {
        const { ingredients } = this.state;
        return (
            <div>
                <div className="linee">
                    <h2 className="otsikko">Hei! Haluatko lisätä uuden reseptin Ruoka-appiimme?</h2>
                    <h4 className="otsikko">Halutessasi lisätä uuden reseptin Ruoka-Appiimme, täytä kaikki
                    allaolevat kentät ja tarkasta, että jokainen kenttä on täytetty. Tämän jälkeen paina Hyväksy-painiketta.</h4>
                    <h4 className="otsikko">Näet kaikki omat reseptisi Omat reseptisi-listassa. Etusivulla voit tarkastella kaikkia
                     julkisia reseptejä, sekä myös kaikkia omia reseptejäsi. </h4>
                    <h4 className="otsikko">Omat reseptisi -listassa voit hallinnoida reseptejäsi.</h4>
                    <h3 className="otsikko">Mahtavia kokkailuhetkiä!</h3>

                </div>
                <br />


                <div className="kukka">
                    <form name="contactform" className="contactform" onSubmit={this.contactSubmit.bind(this)}>
                        <div>


                            <div className="linee2">
                                {/*NIMI*/}
                                <label>
                                    Nimi:
                            </label><br />
                                <input ref="name" type="text" size="30" placeholder="Kirjoita tähän reseptillesi nimi" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]} />
                                <span className="error">{this.state.errors["name"]}</span>
                                <br />
                                {/*MAA*/}
                                <label>
                                    Maa:
                                </label><br />
                                <input ref="country" type="text" size="30" placeholder="Kirjoita tähän reseptin maa" onChange={this.handleChange.bind(this, "country")} value={this.state.fields["country"]} />
                                <span className="error">{this.state.errors["country"]}</span>
                                <br />
                            </div>

                            <div className="linee22">
                                {/*ANNOS KOKO*/}
                                <label>
                                    Annos koko: '
                            </label>
                                <input ref="serving" type="number" pattern="[0-9]*" inputmode="numeric" size="30" onChange={this.handleChange.bind(this, "serving")} value={this.state.fields["serving"]} />
                                <span className="error">{this.state.errors["serving"]}</span>
                                <br />
                                {/*KESTO*/}
                                <label>
                                    Valmistuksen kesto: '
                            </label>
                                <input ref="time" type="number" pattern="[0-9]*" inputmode="numeric" size="30" onChange={this.handleChange.bind(this, "time")} value={this.state.fields["time"]} />
                                <a> minuuttia      </a>
                                <span className="error">{this.state.errors["time"]}</span>
                                <br />
                            </div>

                            <div className="linee23">
                                {/*VAIKEUS*/}
                                <label>
                                    Ruoan valmistuksen vaikeus: '
                            </label>
                                <input ref="difficulty" type="number" pattern="[0-9]*" inputmode="numeric" size="30" onChange={this.handleChange.bind(this, "difficulty")} value={this.state.fields["difficulty"]} />
                                <span className="error">{this.state.errors["difficulty"]}</span>
                                <br />
                                {/*TYYPPI*/}
                                <label>
                                    Ruoan tyyppi: '
                            </label>
                                <select onChange={this.handleChange.bind(this, "type")} value={this.state.fields["type"]}>
                                    <option value="NONE"></option>
                                    <option value="Alkuruoka">
                                        Alkupala
                            </option>
                                    <option value="Pääruoka">
                                        Pääruoka
                            </option>
                                    <option value="Jälkiruoka">
                                        Jälkiruoka
                            </option>
                                </select>
                                <span className="error">{this.state.errors["type"]}</span>
                                <br />
                            </div>

                            <div className="linee3">
                                {/*GLUTEENITON*/}
                                <label>
                                    Gluteeniton:
                            <a> </a>
                                    <a> <input ref="glutenfree" type="radio" name="glutenfree" onChange={this.handleChange.bind(this, "glutenfree")} value={true} /> Kyllä </a>
                                    <a> <input ref="glutenfree" type="radio" name="glutenfree" onChange={this.handleChange.bind(this, "glutenfree")} value={false}></input> Ei </a>
                                </label>
                                <span className="error">{this.state.errors["milkfree"]}</span>
                                <br />
                                {/*LAKTOOSITON*/}
                                <label>
                                    Laktoositon:
                            <a> </a>
                                    <a> <input ref="lactosefree" type="radio" name="lactosefree" onChange={this.handleChange.bind(this, "lactosefree")} value={true} /> Kyllä </a>
                                    <a> <input ref="lactosefree" type="radio" name="lactosefree" onChange={this.handleChange.bind(this, "lactosefree")} value={false}></input> Ei </a>
                                </label>
                                <span className="error">{this.state.errors["lactosefree"]}</span>
                                <br />
                                {/*MAIDOTON*/}
                                <label>
                                    Maidoton: <a> </a>
                                    <a> <input ref="milkfree" type="radio" name="milk" onChange={this.handleChange.bind(this, "milkfree")} value={true} /> Kyllä </a>
                                    <a> <input ref="milkfree" type="radio" name="milk" onChange={this.handleChange.bind(this, "milkfree")} value={false}></input> Ei </a>
                                </label>
                                <span className="error">{this.state.errors["milkfree"]}</span>
                                <br />
                                {/*MUNATON*/}
                                <label>
                                    Munaton: <a> </a>
                                    <a> <input ref="eggfree" type="radio" name="eggfree" onChange={this.handleChange.bind(this, "eggfree")} value={true} /> Kyllä </a>
                                    <a> <input ref="eggfree" type="radio" name="eggfree" onChange={this.handleChange.bind(this, "eggfree")} value={false}></input> Ei </a>
                                </label>
                                <span className="error">{this.state.errors["eggfree"]}</span>
                                <br />
                                {/*VEGAANI*/}
                                <label>
                                    Vegaani: <a> </a>
                                    <a> <input ref="vegan" type="radio" name="vegan" onChange={this.handleChange.bind(this, "vegan")} value={true} /> Kyllä </a>
                                    <a> <input ref="vegan" type="radio" name="vegan" onChange={this.handleChange.bind(this, "vegan")} value={false}></input> Ei </a>
                                </label>
                                <span className="error">{this.state.errors["vegan"]}</span>
                                <br />
                            </div>


                            <div className="linee4">
                                {/*PÄÄRAAKA-AINE*/}
                                <label>
                                    Pääraaka-aine: '
                            </label>
                                <input ref="mainingredient" type="text" size="20" placeholder="Kirjoita tähän" onChange={this.handleChange.bind(this, "mainingredient")} value={this.state.fields["mainingredient"]} />
                                <span className="error">{this.state.errors["mainingredient"]}</span>
                                <br />

                                <br />

                                <label>
                                    Raaka-aineet: '
                            </label>
                                <button onClick={(b) => this.lisaaRuokaa(b)}>Lisää</button>
                                {
                                    ingredients.map((ingredient, index) => {
                                        return (
                                            <div key={index}>
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Raaka-aineen nimi"
                                                        name="nimi"
                                                        value={this.state.ingredients.nimi}
                                                        onChange={evt => this.handleChangeInputs(index, evt)} />
                                                    <input
                                                        type="number"
                                                        placeholder="Määrä"
                                                        name="numero"
                                                        value={this.state.ingredients.numero}
                                                        onChange={evt => this.handleChangeInputs(index, evt)}
                                                    />
                                                    <select onChange={evt => this.handleChangeInputs(index, evt)} name="peraliite" value={this.state.ingredients.peraliite}>
                                                        <option value=""></option>
                                                        <option value="tl">tl</option>
                                                        <option value="rl">rkl</option>
                                                        <option value="kpl">kpl</option>
                                                        <option value="ml">ml</option>
                                                        <option value="cl">cl</option>
                                                        <option value="dl">dl</option>
                                                        <option value="l">l</option>
                                                        <option value="g">g</option>
                                                        <option value="kg">kg</option>
                                                    </select>

                                                    <button onClick={() => this.handleRemove(ingredient)}>Poista</button>
                                                </div>

                                            </div>
                                        )
                                    })
                                }
                                <br />
                            </div>


                            <div className="linee5">
                                {/*VALMISTUS*/}
                                <label>
                                    Valmistus:
                            </label>
                                <br />
                                <textarea ref="text" type="text" placeholder="Kirjoita tähän, miten ruokasi valmistaminen onnistuu reseptisi mukaan!" cols="95" rows="10" onChange={this.handleChange.bind(this, "text")} value={this.state.fields["text"]} />
                                <span className="error">{this.state.errors["text"]}</span>
                                <br />
                                {/*JULKINEN*/}
                                <label>
                                    Julkinen: <a> </a>
                                    <a> <input ref="public" type="radio" name="public" onChange={this.handleChange.bind(this, "public")} value={true} /> Kyllä </a>
                                    <a> <input ref="public" type="radio" name="public" onChange={this.handleChange.bind(this, "public")} value={false}></input> Ei </a>
                                </label>
                                <span className="error">{this.state.errors["public"]}</span>
                                <br />
                            </div>

                            <div className="linee6">
                                <button className="btn btn-lg pro" id="submit" value="Submit" className="painike2" onClick={this.handleButtonClicked.bind(this)}>Hyväksy!</button>
                                <br />
                            </div>

                        </div>
                    </form>
                </div>
                {/*Tama tassa saa jotenkin userinkin muuttumaan ja se osaa paivittaa listan sillai */}
                <UsersRecipes className="omatReseptit" paivita={this.state.paivita} />

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log("nyt ollaan mapissa PANTRY tulosta state: ", state.user);
    return { user: state.user };
}

export default connect(mapStateToProps, {})(Pantry);