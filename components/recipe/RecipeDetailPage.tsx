type RecipeDetailPageParams = {
  recipeID: string;
};

export default function RecipeDetailPage({ recipeID }: RecipeDetailPageParams) {
  return (
    <div>
      <h1>Recipe ID: {recipeID}</h1>
    </div>
  );
}
