import React from 'react';

const NavBarSearchTooltopCard = ({ name, type, state, onClick }: { name: string; type: string; state: string, onClick: any }) => {
  return (
    <div className="navbar-search-tooltip-card" onClick={onClick}>
      <h2>{name}</h2>
      <div>
        <p>{type}</p>
        <span>{state}</span>
      </div>
    </div>
  );
};

export default NavBarSearchTooltopCard;
