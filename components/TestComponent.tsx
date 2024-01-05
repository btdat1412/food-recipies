'use client';
import React, { useEffect, useState } from 'react';

const TestComponent = ({
  ingredients,
  recipes,
}: {
  ingredients: any;
  recipes: any;
}) => {
  const findIngredientName = (ingredientId: any) => {
    const ingredient = ingredients.find((ing: any) => ing.id === ingredientId);
    return ingredient ? ingredient.name : 'Unknown Ingredient';
  };

  return (
    <div>
      {recipes.map((recipe: any) => (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <img src={recipe.image} alt={recipe.name} />
          <p>Calories: {recipe.kcal}</p>
          <div>
            Rating: {recipe.rating.average} from {recipe.rating.quantity} votes
          </div>
          <h3>Ingredients:</h3>
          <ul>
            {recipe.recipeItems.map((item: any) => (
              <li key={item.ingredientId}>
                {findIngredientName(item.ingredientId)} - {item.amount}
              </li>
            ))}
          </ul>
          <h3>Steps:</h3>
          <ol>
            {recipe.steps.map((step: any, index: any) => (
              <li key={index}>
                <p>{step.title}</p>
                <img src={step.imageUrl} alt={step.title} />
                {step.descriptions.map((desc: any, descIndex: any) => (
                  <p key={descIndex}>{desc}</p>
                ))}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default TestComponent;