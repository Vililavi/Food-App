import React, { useState } from 'react';
import './Sidebar.css';
import SearchOptions from './SearchOptions';
import { MainIngredients } from './Lists/MainIngredients';


const Sidebar = (props) => {

    // Toggle
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);




    return (
        <nav>
            <div className="mid-bar">
                <p className="search-logo" onClick={handleClick} >Hae suodattamalla<i className={click ? 'fas fa-times' : 'fas fa-search'}></i></p>
            </div>
            <div className={click ? 'sidebar active' : 'sidebar'}>
                <ul >
                    <SearchOptions getRecipes={props.getRecipes} />
                </ul>
            </div>

        </nav>
    )

};

export default Sidebar;