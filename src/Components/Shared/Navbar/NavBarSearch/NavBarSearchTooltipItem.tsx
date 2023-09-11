import React from 'react';
import NavBarSearchTooltopCard from './NavBarSearchTooltopCard';
interface NavBarSearchTooltipCardProps {
    name: string;
    type: string;
    state: string;
  }
const NavBarSearchTooltipItem = ({ title, cards }: { title: string; cards: NavBarSearchTooltipCardProps[] }) => {
  return (
    <div className="navbar-search-tooltip-item">
      {/* <h1>{title}</h1> */}
      {cards.map((card, index) => (
        <NavBarSearchTooltopCard
          key={index}
          name={card.name}
          type={card.type}
          state={card.state}
        />
      ))}
    </div>
  );
};

export default NavBarSearchTooltipItem;
