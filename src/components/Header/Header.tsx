import React from 'react';
import './Header.css';

class Header extends React.Component<object>{
  render() {
    return (
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Anime Search Application</h1>
          <p className="header-subtitle">Search anime using Shikimori API</p>
        </div>
      </header>
    );
  }
}

export default Header;