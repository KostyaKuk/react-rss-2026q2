import React from 'react';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Main from './components/Main/Main';

interface AppState {
  searchQuery: string;
  isStorageLoaded: boolean;
}
class App extends React.Component<object, AppState> {
  
  constructor(props: object) {
    super(props);
    this.state = {
      searchQuery: '',
      isStorageLoaded: false,
    };
  }

  componentDidMount() {
    this.loadSearchQueryFromStorage();
  }

   loadSearchQueryFromStorage = (): void => {
    try {
      const savedQuery = localStorage.getItem('lastSearchQuery');
      if (savedQuery !== null) {
        this.setState({ searchQuery: savedQuery, isStorageLoaded: true });
      } else {
        this.setState({ isStorageLoaded: true });
      }
    } catch (error) {
      console.warn('Failed to load search query from localStorage:', error);
      this.setState({ isStorageLoaded: true });
    }
  };

  saveSearchQueryToStorage = (query: string): void => {
    try {
      localStorage.setItem('lastSearchQuery', query);
    } catch (error) {
      console.warn('Failed to save search query to localStorage:', error);
    }
  };

  handleSearchChange = (value: string): void => {
    this.setState({ searchQuery: value });
  };

  handleSearchSubmit = (): void => {
    const { searchQuery } = this.state;
    
    this.saveSearchQueryToStorage(searchQuery);
    
    console.log('Search submitted:', searchQuery);
  };

  render() {
    const { searchQuery, isStorageLoaded } = this.state;
    
    if (!isStorageLoaded) {
      return null; 
    }
    return (
      <div className="app">
        <Header />
        
        <Search
          value={searchQuery}
          onChange={this.handleSearchChange}
          onSubmit={this.handleSearchSubmit}
        />

        <Main key={searchQuery} searchQuery={searchQuery} />
      </div>
    );
  }
}

export default App;
