import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import { v4 as uuidv4 } from 'uuid'
import './App.css';

const App = () => {

  const APP_ID = "e8a62715";
  const APP_KEY = "2777d107ddc83cc4f9c75a6b444ceb71";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')

  useEffect(() => {
    getRecipes()
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    if (data.hits.length === 0) {
      alert("ERROR: There were no results for searched value")
      return
    }
    setRecipes(data.hits)
    console.log(data.hits)
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  return (
    <div className='App'>
      <form onSubmit={getSearch} className='search-form'>
        <label className='food-label' htmlFor='search-food'>Food or ingredient: </label>
        <input name='search-food' placeholder='chicken' className='search-bar' type="text" value={search} onChange={updateSearch} />
        <button className='search-button' type='submit'>Search</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe
            key={uuidv4()}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          >
          </Recipe>
        ))}
      </div>
    </div>
  );
}

export default App;
