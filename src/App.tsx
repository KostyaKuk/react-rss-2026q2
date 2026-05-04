import React from 'react';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Main from './components/Main/Main';

interface AppState {
  searchQuery: string;
}
class App extends React.Component<object, AppState> {
  
  constructor(props: object) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.loadSearchQueryFromStorage();
  }

  loadSearchQueryFromStorage = (): void => {
    try {
      const savedQuery = localStorage.getItem('lastSearchQuery');
      if (savedQuery !== null) {
        this.setState({ searchQuery: savedQuery });
      }
    } catch (error) {
      console.warn('Failed to load search query from localStorage:', error);
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
    return (
      <div className="app">
        <Header />
        
        <Search
          value={this.state.searchQuery}
          onChange={this.handleSearchChange}
          onSubmit={this.handleSearchSubmit}
        />

        <Main searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}

export default App;
