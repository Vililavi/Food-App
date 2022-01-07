const express = require('express');
const app = express();
const router = express.Router();
const recipe = require("../models/recipe");
const mongo = require('mongodb');

//Hakee kaikki reseptit
router.get('/', async (req, res, next) => {
    console.log('GET request in recipes');
    try {
        const recipes = await recipe.find();
        res.json(recipes);
    } catch (err) {
        res.json({ message: "error: cannot find recipes" });
    }
});

//Hakee nimellä
router.get('/byname', async (req, res, next) => {

    let params = {};
    if (!req.query.name == "" || !req.query.name == null) {
        let nimi = req.query.name
        params["name"] = { $regex: nimi, $options: "-i" };
        try {
            if (!req.query.user_id) {
                console.log("user_id ei syötetty");
                params["public"] = true;
                console.log("params: ", params);
                const recipes = await recipe.find(params).exec();
                res.json(recipes);
                // Palauttaa kaikki julkiset reseptit
            }
            else {
                console.log("user_id syötettiin");
                console.log("params: ", params);
                let recipes = await recipe.find(params).exec();
                let b = recipes.filter(e => e.public === true ||
                    (e.user_id === req.query.user_id && e.public === false));

                res.json(b);
                // Palauttaa julkiset ja kayttajan omat reseptit
            }

        } catch (err) {
            res.json({ message: "error: cannot find by name " + err });
        }
    }
    else {
        res.json(await recipe.find().exec());
    }
});

//Hakee parametreilla 'name' ja 'country'
router.get('/byparameter', async (req, res, next) => {
    console.log('Get request in recipes');
    let ehdot = {};
    try {
        if (req.query.name) {
            ehdot.name = req.query.name;
        }
        if (req.query.country) {
            ehdot.country = req.query.country;
        }
        const recipes = await recipe.findOne(ehdot).exec();
        res.json(recipes);
    } catch (err) {
        res.json({ message: "error: cannot find by parameter " + err });
    }
});

//Hakee id:llä
router.get('/byid', async (req, res, next) => {
    console.log('Get request in recipes');
    let orderId = req.query._id;
    try {
        const recipes = await recipe.findById(mongo.ObjectID(orderId)).exec();
        res.json(recipes);
    } catch (err) {
        res.json({ message: "error: cannot find by id " + err });
    }
});

//Suorittaa reseptihaun
router.get('/search', async (req, res, next) => {
    console.clear();
    console.log('Get request in recipes ');
    let params = {};

    try {
        if (req.query.name) {
            let recipe_name = req.query.name.toLowerCase();
            let name = recipe_name[0].toUpperCase() + recipe_name.substring(1);
            params["name"] = name;
        }
        if (req.query.country) {
            params["country"] = req.query.country;
        }
        if (req.query.type) {
            params["type"] = req.query.type;
        }
        if (req.query.glutenfree) {
            params["glutenfree"] = req.query.glutenfree;
        }
        if (req.query.lactosefree) {
            params["lactosefree"] = req.query.lactosefree;
        }
        if (req.query.milkfree) {
            params["milkfree"] = req.query.milkfree;
        }
        if (req.query.eggfree) {
            params["eggfree"] = req.query.eggfree;
        }
        if (req.query.vegan) {
            params["vegan"] = req.query.vegan;
        }
        if (req.query.mainingredient) {
            params["mainingredient"] = req.query.mainingredient;
        }
        if (!req.query.user_id) {
            console.log("user_id ei syötetty");
            params["public"] = true;
            console.log("params: ", params);
            const recipes = await recipe.find(params).exec();

            res.json(recipes);
        }
        else {
            console.log("user_id syötettiin");
            console.log("params: ", params);
            let recipes = await recipe.find(params).exec();
            let b = recipes.filter(e => e.public === true ||
                (e.user_id === req.query.user_id && e.public === false));

            res.json(b);
        }


    } catch (err) {
        res.json({ message: "error: cannot find by parameters " + err });
    }
});

//Lisää reseptin
router.post("/addrecipe", async (req, res, next) => {
    try {
        let Recipe = new recipe();
        console.log("POST request to recipes");

        let recipe_name = req.body.name.toLowerCase();
        let nimi = recipe_name[0].toUpperCase() + recipe_name.substring(1);
        Recipe.name = nimi;
        Recipe.lactosefree = false;
        Recipe.glutenfree = false;
        Recipe.milkfree = false;
        Recipe.eggfree = false;
        Recipe.vegan = false;
        Recipe.text = "ei käyttäjän syöttämää tekstiä";

        if (req.body.user_id) {
            Recipe.user_id = req.body.user_id;
        }
        if (req.body.mainingredient) {
            Recipe.mainingredient = req.body.mainingredient;
        }
        if (req.body.country) {
            Recipe.country = req.body.country;
        }
        if (req.body.serving) {
            Recipe.serving = req.body.serving;
        }
        if (req.body.time) {
            Recipe.time = req.body.time;
        }
        if (req.body.difficulty) {
            Recipe.difficulty = req.body.difficulty;
        }
        if (req.body.public === true) {
            Recipe.public = true;
        }
        else {
            Recipe.public = false;
        }
        if (req.body.lactosefree) {
            Recipe.lactosefree = req.body.lactosefree;
        }
        if (req.body.glutenfree) {
            Recipe.glutenfree = req.body.glutenfree;
        }
        if (req.body.milkfree) {
            Recipe.milkfree = req.body.milkfree;
        }
        if (req.body.eggfree) {
            Recipe.eggfree = req.body.eggfree;
        }
        if (req.body.vegan) {
            Recipe.vegan = req.body.vegan;
        }
        if (req.body.ingredient) {
            Recipe.ingredient = req.body.ingredient;
        }
        if (req.body.text) {
            Recipe.text = req.body.text;
        }
        if (req.body.type) {
            Recipe.type = req.body.type;
        }

        Recipe.save(function (err, doc) {
            if (err) {
                console.log("tuli ongelmia reseptin lisäämisessä");
                res.json(err);
            }
            else {
                console.log("lisaattiin resepti kantaan");
                res.json(doc);
            }
        });


    } catch (err) {
        res.json({ message: "error: " + err });
    }
});

//Reseptin poisto id:llä
router.delete("/deleterecipe", async (req, res, next) => {
    console.log("Delete recipe");
    let id = req.query._id;
    await recipe.deleteOne({ "_id": id }, function (err) {
        if (err) {
            res.json({ message: err });
        }
        else {
            res.json({ message: "Reseptin " + id + " poisto onnistui" });
        }
    });
});

module.exports = router;