import axios from 'axios';

export default async function getRecipies({ query }: { query: string }) {
  const response = await axios.get(`https://api.edamam.com/api/recipes/v2`, {
    params: {
      app_id: '898ec6e5',
      app_key: '296ad33ad9bfb1be9b0a52f824bbdbc9',
      type: 'public',
      q: query,
      from: 0,
      to: 20,
    },
  });

  if (!response) {
    throw new Error('Failed to fetch data');
  }

  return response;
}
