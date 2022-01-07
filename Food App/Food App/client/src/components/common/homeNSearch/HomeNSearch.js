import React, { useState, useEffect } from 'react';
import SearchBar from './searchBar';
import Sidebar from './sidebar';
import Alert from './alert';
import axios from 'axios';
import './HomeNSearch.css';
import SearchList from './searchList';

import { connect } from 'react-redux';

const HomeNSearch = (user) => {
    const [results, setResults] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const handleShow = (props) => {
        setShowAlert(props);
    }
    //Eka haku, jotta results ei tyhja
    useEffect(() => {
        fetch('http://localhost:5000/recipe_routes/search?user_id=' + user.user.userID)
            .then(response => response.json())
            .then(data => {
                setResults(data);
            });
    }, []);

    // Suodatushaku
    const getRecipes = async (params) => {

        let query = `http://localhost:5000/recipe_routes/search?type=${params.category}&country=${params.country}&mainingredient=${params.ingredient}`;


        if (params.diet1 !== "") {
            query = query + `&${params.diet1}=true`
        }
        if (params.diet2 !== "") {
            query = query + `&${params.diet2}=true`
        }
        if (params.diet3 !== "") {
            query = query + `&${params.diet3}=true`
        }
        if (user.user.userID !== null) {
            query = query + `&user_id=` + user.user.userID;
        }
        console.log(query);

        try {
            const response = await axios.get(query);
            console.log(response.data);
            if (response.data.length === 0) {
                setShowAlert(true);
            }
            setResults(response.data);

        } catch (err) {
            console.error(err);
        }

    }

    //Sanahaku
    const getRecipesByName = async (hakusana) => {

        if (hakusana === "") {
            try {
                const response = await axios
                    .get('http://localhost:5000/recipe_routes/', {
                        params: { user_id: user.user.userID },
                        headers: {
                            'content-Type': 'application/json'
                        }
                    });
                console.log("response: ", response.data)
                setResults(response.data);
                console.log("Results after wordrSearch: ", results);
            } catch (err) {
                console.error(err);
            }
        }
        else {
            try {
                const response = await axios
                    .get('http://localhost:5000/recipe_routes/byname', {
                        params: { name: hakusana, user_id: user.user.userID },
                        headers: {
                            'content-Type': 'application/json'
                        }
                    });
                console.log("response: ", response.data)
                if (response.data.length === 0) {
                    setShowAlert(true);
                }
                setResults(response.data);
                console.log("Results after wordrSearch: ", results);
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <div>
            <div className="theBar">

                <div className="filterSearch" >
                    <Sidebar getRecipes={getRecipes} />
                </div>
                <div className="wordSearch">
                    <SearchBar getRecipesByName={getRecipesByName} />
                </div>
            </div>
            <div className="searchList">
                <SearchList results={results} />
            </div>
            {showAlert
                ? <Alert showAlert={showAlert} handleShow={handleShow} />
                : <div> </div>
            }

        </div>
    )
};


const mapStateToProps = (state) => {
    console.log("nyt ollaan mapissa HomeNSearch tulosta state: ", state);
    return { user: state.user };
}

export default connect(mapStateToProps, {})(HomeNSearch);