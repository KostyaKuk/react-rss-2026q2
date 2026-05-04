import React from 'react';
import './Card.css';

interface CardProps {
  name: string;
  description: string;
  image?: string;
}

class Card extends React.Component<CardProps> {
  handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/80x120?text=No+Image';
  };

  render() {
    const { name, description, image } = this.props;
    const defaultImage = 'https://via.placeholder.com/80x120?text=No+Image';

    return (
      <div className="card">
        <div className="card-content">
          <div className="card-image-container">
            <img 
              src={image || defaultImage}
              alt={name}
              className="card-image"
              loading="lazy"
              onError={this.handleImageError}
            />
          </div>
          
          <div className="card-text">
            <h3 className="card-title">{name}</h3>
            <p className="card-description">
              {description || 'No description available.'}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;