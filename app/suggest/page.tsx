import { getAllIngredients } from '@/services';
import SuggestPage from '../../components/suggest-page/SuggestPage';

export default async function Suggest() {
  const ingredients = await getAllIngredients();

  return <SuggestPage ingredients={ingredients} />;
}
