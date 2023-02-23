import React from "react";
import { v4 as uuidv4 } from 'uuid'
import style from './recipe.module.css';

const Recipe = ({ title, calories, image, ingredients }) => {
    return (
        <div className={style.recipe}>
            <h1>{title}</h1>
            <h3>Ingredients:</h3>
            <ul>
                {ingredients.map(ingredient => (
                    <li key={uuidv4()}>{ingredient.text}</li>
                ))}
            </ul>
            <p>{Math.floor(calories)} Calories</p>
            <img src={image} alt="" />
        </div>
    )
}

export default Recipe