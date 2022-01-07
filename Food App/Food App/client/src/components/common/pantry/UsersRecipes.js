import { useState, useEffect } from 'react';
import './UsersRecipes.css';
import { connect } from 'react-redux';
import axios from 'axios';



const UsersRecipes = (user, props) => {


    const [results, setResults] = useState([]);
    const [afterDel, setAfterDel] = useState(0);

    // Haetaan kayttajan reseptit
    useEffect(() => {
        fetch('http://localhost:5000/recipe_routes/search?user_id=' + user.user.userID)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setResults(data);
            });
    }, [user]);

    useEffect(() => {
        fetch('http://localhost:5000/recipe_routes/search?user_id=' + user.user.userID)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setResults(data);
            });
    }, [afterDel]);

    const deleteRecipe = (e) => {
        console.log("KLICK: ", e);
        let id = e;

        const delRecip = async (id) => {
            console.log("KUTSU: ", id);
            const { data } = await axios.delete(`http://localhost:5000/recipe_routes/deleterecipe?_id=${id}`);
            console.log(data);
            setAfterDel(afterDel + 1);
        }
        delRecip(id);
    }


    return (
        <div className="recipesContainer">
            <div className="head">
                <h2>Omat reseptisi:</h2>
            </div>
            <div>
                <li className="list-ur">
                    {results.filter(result => result.user_id === user.user.userID).map(filteredResult => (
                        <ul className="list-item-ur" name={filteredResult._id}>
                            {filteredResult.name}
                            <button className="delete-ur"
                                onClick={(e) => deleteRecipe(filteredResult._id)}>Poista</button>
                        </ul>

                    ))}
                </li>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => {
    console.log("nyt ollaan mapissa USERSRECIPES tulosta state: ", state.user);
    return { user: state.user };
}

export default connect(mapStateToProps, {})(UsersRecipes);