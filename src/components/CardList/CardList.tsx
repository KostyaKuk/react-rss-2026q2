import React from 'react';
import Card from '../Card/ Card';
import type { Item } from '../../types/types';

interface CardListProps {
  items: Item[];
}

class CardList extends React.Component<CardListProps> {
  render() {
    const { items } = this.props;

    if (items.length === 0) {
      return (
        <div className="no-results">
          <p>No results found</p>
        </div>
      );
    }

    return (
      <div className="card-list">
        {items.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    );
  }
}

export default CardList;