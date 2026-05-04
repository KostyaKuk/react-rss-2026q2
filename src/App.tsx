import React from 'react';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Main from './components/Main/Main';

interface AppState {
  searchQuery: string;
}
class App extends React.Component<object, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }

  handleSearchChange = (value: string): void => {
    this.setState({ searchQuery: value });
  };

  handleSearchSubmit = (): void => {
    console.log('Search submitted:', this.state.searchQuery);
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