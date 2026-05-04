import React from 'react';
import './Search.css';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

class Search extends React.Component<SearchProps> {

  handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.props.onSubmit();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="search-form">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search anime..."
            value={this.props.value}
            onChange={(e) => this.props.onChange(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
    );
  }
}

export default Search;