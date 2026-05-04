export interface Item {
  id: number;
  name: string;
  description: string;
  image?: string;
}

export interface AppState {
  items: Item[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}