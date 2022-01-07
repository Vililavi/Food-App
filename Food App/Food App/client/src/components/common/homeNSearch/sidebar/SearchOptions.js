import React, { useEffect } from 'react';
import './Sidebar.css';
import { Categories } from './Lists/Categories';
import { MainIngredients } from './Lists/MainIngredients';
import { SpecialDiets } from './Lists/SpecialDiets';
import { Styles } from './Lists/Styles';
import { useState } from 'react';



const SearchOptions = (props) => {

    const [params, setParams] = useState({
        category: "",
        ingredient: "",
        country: "",
        diet1: "",
        diet2: "",
        diet3: "",
    });

    return (
        <div >
            <form>
                <div>
                    <label className="searchHeaders">Mitä tekisi mieli?</label>
                    <select className="searchItems-select" value={params.category} onChange={(e) => setParams({ ...params, category: e.target.value })}>
                        {Categories.map(item => {
                            return (
                                <option value={item.key} key={item.key}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
                    <br></br>
                    <label className="searchHeaders">Minkä maalaista?</label>
                    <select className="searchItems-select" value={params.country} onChange={(e) => setParams({ ...params, country: e.target.value })}>
                        {Styles.map(item => {
                            return (
                                <option value={item.key} key={item.key}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
                    <br></br>
                    <label className="searchHeaders">Pääraaka-aine</label>
                    <select className="searchItems-select" value={params.ingredient} onChange={(e) => setParams({ ...params, ingredient: e.target.value })}>
                        {MainIngredients.map(item => {
                            return (
                                <option value={item.key} key={item.key}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
                    <br></br>
                    <label className="searchHeaders-diets">Erityisruokavaliot max. 3</label>
                    <label className="searchHeaders">Erityisruokavalio 1</label>
                    <select className="searchItems-select" value={params.diet1} onChange={(e) => setParams({ ...params, diet1: e.target.value })}>
                        {SpecialDiets.map(item => {
                            return (
                                <option value={item.key} key={item.key}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
                    <br></br>
                    <label className="searchHeaders">Erityisruokavalio 2</label>
                    <select className="searchItems-select" value={params.diet2} onChange={(e) => setParams({ ...params, diet2: e.target.value })}>
                        {SpecialDiets.map(item => {
                            return (
                                <option value={item.key} key={item.key}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
                    <br></br>
                    <label className="searchHeaders">Erityisruokavalio 3</label>
                    <select className="searchItems-select" value={params.diet3} onChange={(e) => setParams({ ...params, diet3: e.target.value })}>
                        {SpecialDiets.map(item => {
                            return (
                                <option value={item.key} key={item.key}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
                    <br></br>
                </div>
            </form>
            <button className="searchButton" onClick={() => props.getRecipes(params)} onMouseUp={!props.click}> Hae </button>

        </div>
    )

};

export default SearchOptions;