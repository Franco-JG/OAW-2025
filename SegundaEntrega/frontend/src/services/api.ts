import { Feed, News, APIResponse } from '../types';

const API_URL = 'http://localhost:8080/OAW-2025%201/backend/routes/api.php';

export const getFeeds = async (): Promise<Feed[]> => {
  const response = await fetch(`${API_URL}?feeds`);
  const result : APIResponse = await response.json();
  if(result.success && Array.isArray(result.data)) {
    return result.data as Feed[];
  }
  throw new Error("Error al obtener los feeds");

};

export const getNews = async (sortBy = "pub_date"): Promise<News[]> => {
  const response = await fetch(`${API_URL}?news&order=${sortBy}`);
  const result: APIResponse = await response.json();

  if (result.success && Array.isArray(result.data)) {
    return result.data as News[];
  }
  throw new Error("Error al obtener las noticias");
};

export const addFeed = async (url: string): Promise<string> => {
  const response = await fetch(`${API_URL}?feeds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });
  const result : APIResponse = await response.json();
  if(result.success) {
    return result.data as string;
  }
  throw new Error('Error al agregar el feed');
};

export const updateNews = async (): Promise<void> => {
  const response = await fetch(`${API_URL}?news`, {
    method: 'POST',
  });
  const result : APIResponse = await response.json();
  if (!result.success) {
    throw new Error('Error al actualizar las noticias');
  }
};

export const searchNews = async (query: string): Promise<News[] | string> => {
  const response = await fetch(`${API_URL}?news&q=${query}`);
  const result: APIResponse = await response.json();
  if (Array.isArray(result.data)) {
    return result.data as News[];
  }
  else{
    return result.data as string;
  }
}