const express = require('express');
const app = express();
const router = express.Router();
const user = require("../models/user");





//Kesken, ELÄ KOSKE!
router.get('/', async (req, res, next) => {
    console.log('GET resquest in users');
    try {
        const users = await user.find();
        res.json(users);
    } catch (err) {
        res.json({ message: "error" });
    }
});
router.post("/checkusertesti", async (req, res, next) => {
    console.log("annetaan valmiit parametrit, käyttäjätunnus: Makeonisanta, salasana: jankonbetsu22");
    req.body.username = "Makeonisanta";
    req.body.password = "jankonbetsu22";
    console.log("testi lahtee annetuilla parametreillä käyttäjätunnus: " + req.body.username + ", salasana: " + req.body.password);
    try {
        let users = await user.findOne({ username: req.body.username, password: req.body.password }).exec();
        console.log("testi päättyy lähetetään tiedot");
        res.json(users);
    } catch (err) {
        res.json({ errori: err });
    }
})

router.post("/checkuser", async (req, res, next) => {
    console.log("lähtee tarkistus onko käyttäjä olemassa");
    try {

        let kayttis = req.body.username;
        let salis = req.body.password;

        let users = await user.findOne({ username: kayttis, password: salis }).exec();
        if (users == null) {
            res.json({ message: "oli tyhjä ei käyttäjää" });
        }
        else {
            res.json(users);
        }
    } catch (err) {
        res.send({ message: err });
    }
});

router.post("/adduser", async (req, res, next) => {
    try {

        let kayttaja = new user();
        kayttaja["username"] = req.body.username;
        kayttaja["password"] = req.body.password;
        console.log("uus kayttis: " + kayttaja.username + ", uus salis: " + kayttaja.password);

        let users = await user.findOne({ username: req.body.username }).exec();
        if (users != null) {
            res.json({ message: "ei voi lisää käyttäjä jo olemassa" });
        }
        else {
            kayttaja.save(function (err, doc) {
                if (err) {
                    console.log("tuli ongelmia käyttäjän lisäämisessä");
                    res.json(err);
                }
                else {
                    console.log("lisaattiin henkilö kantaan");
                    res.json(doc);
                }
            });
        }

    } catch (err) {
        res.json({ message: "tuli virhe: " + err });
    }
});
router.delete("/deleteuser", async (req, res, next) => {
    console.log("poisto lähtee");
    let kayttis = req.query.username;
    let salis = req.query.password;
    user.deleteOne({ username: kayttis, password: salis }, function (err) {
        if (err) {
            res.json({ message: err });
        }
        else {
            res.json({ message: "poisto onnistui henkilölle: " + kayttis });
        }
    });
});


module.exports = router;