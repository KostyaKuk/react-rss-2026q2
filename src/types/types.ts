export interface Item {
  id: number;
  name: string;
  description: string;
}

export interface AppState {
  items: Item[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}