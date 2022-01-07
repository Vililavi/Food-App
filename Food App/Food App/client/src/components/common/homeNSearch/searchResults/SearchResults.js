import React, { useState } from 'react'
import './searchResults.css';
import { useEffect } from 'react';


const SearchResults = (props) => {

  const [results, setResults] = useState([]);

  const [ingredients, setIngredients] = useState({});
  const ingredients2 = Object.entries(ingredients);

  useEffect(() => {
    fetch('http://localhost:5000/recipe_routes/byid?_id=' + props.selattavaResepti)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setResults(data);
        setIngredients(data.ingredient)

      });
  }, []);
  

  return (
    <div class="jeejee">

      <div id="item1">
        <h2>{results.name}</h2>
      </div>
        
      <div id="item4">
        <p>Raaka-aineet:</p>
        {ingredients2.map(item => {
          return (
            <li>
              {item[0]} : {item[1]}
            </li>
          )
        })}
        
      </div>
      
        <div id="item2">
          <p>Maa: {results.country}</p>
          <p>Annos määrä: {results.serving}</p>
          <p>Valmistusaika: {results.time}minuuttia</p>
          <p>Vaikeusaste: {results.difficulty}</p>
          <p>Pääraaka-aine: {results.mainingredient}</p>
          <p>Laktoositon: {results.lactosefree === true && <strong><a>Kyllä</a></strong>}{results.lactosefree === false && <a>Ei</a>}</p>
          <p>Gluteeniton: {results.glutenfree === true && <strong><a>Kyllä</a></strong>}{results.glutenfree === false && <a>Ei</a>}</p>
          <p>Munaton: {results.eggfree === true && <strong><a>Kyllä</a></strong>}{results.eggfree === false && <a>Ei</a>}</p>
          <p>Vegaani: {results.vegan === true && <strong><a>Kyllä</a></strong>}{results.vegan === false && <a>Ei</a>}</p>
          <p>Maidoton: {results.milkfree === true && <strong><a>Kyllä</a></strong>}{results.milkfree === false && <a>Ei</a>}</p>
        </div>
    
        <div id="item3">
          <p>Valmistus: <p>{results.text}</p></p>
        </div>
        
      
    </div>
  )
}

export default SearchResults;