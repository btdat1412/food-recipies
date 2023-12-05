import React from "react";
import getRecipies from "./api/recipies/recipies";
import { ModeToggle } from "../components/theme-toggle";

export default async function Home() {
  const recipesData = await getRecipies({ query: "chicken" });
  return (
    <div>
      <ModeToggle />
      <div className="flex flex-wrap justify-center">
        {recipesData.data.hits.map((recipe: any) => (
          <div
            key={recipe.recipe.uri}
            className="m-4 max-w-xs rounded overflow-hidden shadow-lg"
          >
            <img
              src={recipe.recipe.image}
              alt={recipe.recipe.label}
              className="w-full h-48 object-cover"
            />
            <div className="px-6 py-4">
              <h3 className="font-semibold text-xl mb-2">
                {recipe.recipe.label}
              </h3>
              <a
                href={recipe.recipe.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded inline-block"
              >
                See Recipe
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
