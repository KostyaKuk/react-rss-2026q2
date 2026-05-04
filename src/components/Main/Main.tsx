import React from 'react';
import CardList from '../CardList/CardList';
import './Main.css';
import { ShikimoriService, type ShikimoriAnime } from '../../api/api';
import type { Item } from '../../types/types';

interface MainProps {
  searchQuery: string;
}

interface MainState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    this.state = {
      items: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.loadAnime();
  }

  componentDidUpdate(prevProps: MainProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.loadAnime();
    }
  }

  private adaptToItem = (anime: ShikimoriAnime): Item => {
     const SHIKIMORI_IMAGE_BASE_URL = 'https://shikimori.one';
     let imageUrl = '';

    if (anime.image?.original) {
      imageUrl = `${SHIKIMORI_IMAGE_BASE_URL}${anime.image.original}`;
    } else if (anime.image?.preview) {
      imageUrl = `${SHIKIMORI_IMAGE_BASE_URL}${anime.image.preview}`;
    }

    return {
      id: anime.id,
      name: anime.name,
      description: anime.description || anime.russian || 'No description available.',
      image: imageUrl
    };
  };

  loadAnime = async (): Promise<void> => {
    this.setState({ loading: true, error: null });

    try {
      const data = await ShikimoriService.searchAnime(this.props.searchQuery);
      const adaptedItems = data.map(this.adaptToItem);
      this.setState({ items: adaptedItems });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to load data. Please try again later.';
      
      this.setState({
        error: errorMessage,
        items: []
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { items, loading, error } = this.state;

    return (
      <main className="main">
        <div className="main-container">
          <h2 className="results-title">
            {this.props.searchQuery 
              ? `Results for "${this.props.searchQuery}"` 
              : "Popular Anime"}
          </h2>

          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>
                {this.props.searchQuery 
                  ? `Searching for "${this.props.searchQuery }"...` 
                  : "Loading popular anime..."}
              </p>
            </div>
          )}
          
          {error && <div className="error">{error}</div>}

          {!loading && !error && (
            <CardList items={items} />
          )}
        </div>
      </main>
    );
  }
}

export default Main;