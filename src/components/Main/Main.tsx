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
  currentPage: number;
  hasNextPage: boolean;
}

class Main extends React.Component<MainProps, MainState> {
  private readonly PAGE_SIZE = 12;

  constructor(props: MainProps) {
    super(props);
    this.state = {
      items: [],
      loading: false,
      error: null,
      currentPage: 1,
      hasNextPage: true,
    };
  }

  componentDidMount() {
    this.loadAnime();
  }

  componentDidUpdate(prevProps: MainProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ currentPage: 1, items: [], hasNextPage: true }, () => {
        this.loadAnime();
      });
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
    const { currentPage } = this.state;
    
    this.setState({ loading: true, error: null });

    try {
      const data = await ShikimoriService.searchAnime(
        this.props.searchQuery, 
        this.PAGE_SIZE, 
        currentPage
      );
      
      const adaptedItems = data.map(this.adaptToItem);
      const hasNextPage = data.length === this.PAGE_SIZE;
      
      this.setState({ 
        items: adaptedItems,
        hasNextPage: hasNextPage
      });
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

  goToNextPage = (): void => {
    const { currentPage, hasNextPage } = this.state;
    
    if (hasNextPage) {
      this.setState({ currentPage: currentPage + 1 }, () => {
        this.loadAnime();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  goToPrevPage = (): void => {
    const { currentPage } = this.state;
    
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 }, () => {
        this.loadAnime();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  render() {
    const { items, loading, error, currentPage, hasNextPage } = this.state;
    const { searchQuery } = this.props;

    return (
      <main className="main">
        <div className="main-container">
          <h2 className="results-title">
            {searchQuery 
              ? `Results for "${searchQuery}"` 
              : "Popular Anime"}
            {!loading && items.length > 0 && ` - Page ${currentPage}`}
          </h2>

          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>
                {searchQuery 
                  ? `Searching for "${searchQuery}"...` 
                  : "Loading popular anime..."}
              </p>
            </div>
          )}
          
          {error && <div className="error">{error}</div>}

          {!loading && !error && (
            <>
              <CardList items={items} />
              
              {items.length > 0 && (
                <div className="pagination">
                  <button
                    onClick={this.goToPrevPage}
                    disabled={currentPage === 1}
                    className="pagination-button"
                  >
                    ← Previous
                  </button>
                  
                  <span className="page-info">
                    Page {currentPage}
                  </span>
                  
                  <button
                    onClick={this.goToNextPage}
                    disabled={!hasNextPage}
                    className="pagination-button"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    );
  }
}

export default Main;
