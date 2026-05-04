import React from 'react';
import './Main.css';

interface MainProps {
  searchQuery: string;
}

class Main extends React.Component<MainProps> {
  render() {
    return (
      <main className="main">
        <div className="main-container">
          <h2 className="results-title">Results</h2>
          
          <div className="results-placeholder">
            <p>Search results</p>
            <small>Current search: {this.props.searchQuery || 'nothing yet'}</small>
          </div>
        </div>
      </main>
    );
  }
}

export default Main;