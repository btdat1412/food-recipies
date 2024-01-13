import { ShareDialog } from '../../components/ShareDialog';
import { getAllIngredients } from '../../services';

export default async function Dialog() {
  const ingredients = await getAllIngredients();

  return <ShareDialog dbIngredients={ingredients} />;
}
