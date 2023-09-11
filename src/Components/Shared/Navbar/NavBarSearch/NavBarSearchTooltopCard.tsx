import React from 'react';

const NavBarSearchTooltopCard = ({ name, type, state }: { name: string; type: string; state: string }) => {
  return (
    <div className="navbar-search-tooltip-card">
      <h2>{name}</h2>
      <div>
        <p>{type}</p>
        <span>{state}</span>
      </div>
    </div>
  );
};

export default NavBarSearchTooltopCard;
