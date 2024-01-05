type RecipeDetailParams = {
  params: { recipeID: string };
};

const RecipeDetail = ({ params }: RecipeDetailParams) => {
  return (
    <div>
      <h1>Recipe ID: {params.recipeID}</h1>
    </div>
  );
};

export default RecipeDetail;
