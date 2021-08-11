import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
    const APP_ID = process.env.REACT_APP_ID;
    const APP_KEY = process.env.REACT_APP_KEY;
    let index = 0;

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("icecream");

    useEffect(() => {
        getRecipes();
    }, [query]);

    const getRecipes = async () => {
        const respone = await fetch(
            `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        const data = await respone.json();
        setRecipes(data.hits);
    };

    const updateSearch = (e) => {
        setSearch(e.target.value);
        console.log(search);
    };

    const getSearch = (e) => {
        e.preventDefault();
        setQuery(search);
        setSearch("");
    };

    return (
        <div className="app">
            <div className="title">Instant Recipe</div>
            <form onSubmit={getSearch} className="search-form">
                <input
                    className="search-bar"
                    type="text"
                    value={search}
                    onChange={updateSearch}
                ></input>
                <button className="search-button" type="submit">
                    Search
                </button>
            </form>
            <div className="recipes">
                {recipes.map((recipe) => (
                    <Recipe
                        key={index++}
                        title={recipe.recipe.label}
                        image={recipe.recipe.image}
                        calories={recipe.recipe.calories}
                        ingredients={recipe.recipe.ingredients}
                    ></Recipe>
                ))}
            </div>
        </div>
    );
};
export default App;
