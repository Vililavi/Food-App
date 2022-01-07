import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hakusana: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
    }

    handleChange(event) {

        this.setState({
            hakusana: event.target.value
        })
    }

    handleKeypress = e => {
        if (e.keyCode === 13) {
            this.btn.click();
        }
    };

    render() {
        return (
            <div>
                <li className="list-sb">
                    <input type="text"
                        placeholder="Hae reseptejä..."
                        value={this.state.hakusana}
                        className="searchBar"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeypress} />
                    <button className="searchBtn" ref={node => (this.btn = node)} onClick={() => this.props.getRecipesByName(this.state.hakusana)}> Hae </button>
                </li>
            </div>
        );
    }
}

export default SearchBar;