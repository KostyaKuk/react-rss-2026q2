const BASE_URL = 'https://shikimori.one/api';

export interface ShikimoriAnime {
  id: number;
  name: string;
  russian: string;
  description?: string | null;
  kind: string;
  score: string;
  episodes: number;
  image: {
    original: string;
    preview: string;
  };
}

export class ShikimoriService {
  static async searchAnime(
    query: string = '', 
    limit: number = 12, 
    page: number = 1
  ): Promise<ShikimoriAnime[]> {
    let url = `${BASE_URL}/animes?limit=${limit}&page=${page}&order=popularity`;

    if (query.trim()) {
      url += `&search=${encodeURIComponent(query)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  }
}