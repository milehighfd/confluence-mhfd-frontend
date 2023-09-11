import React from 'react';
import NavBarSearchTooltipItem from './NavBarSearchTooltipItem';

const cardData = [
  {
    name: 'West Tollgate Creek @ 15th and Clemtine @ 15th and Clemtine',
    type: 'CIP Project · Construction Phase',
    state: 'Draft',
  },
];
const cardData2 = [
  {
    name: 'West Tollgate Creek @ 15th and Clemtine 15th and Clemtine 15th and Clemtine',
    type: '2023 Work Request · R&D',
    state: 'Draft',
  },
  {
    name:"West Tollgate Creek @ 15th and Clemtine 15th and Clemtine 15th and Clemtine",
    type:"2023 Work Request · Maintenance",
    state:"Draft"
  }
];
const cardData3 = [
  {
    name: 'West Tollgate Creek @ 15th and Clemtine 15th and Clemtine 15th and Clemtine',
    type: '2023 Work Plan · Acquisition',
    state: 'Draft',
  },
  {
    name:"West Tollgate Creek @ 15th and Clemtine 15th and Clemtine 15th and Clemtine",
    type:"2023 Work Plan · Study",
    state:"Draft"
  }
];

const NavBarSearchTooltip = () => {
  return (
    <div className="navbar-search-tooltip">
      <NavBarSearchTooltipItem title="PM Tools > Detail Page" cards={cardData} />
      <NavBarSearchTooltipItem title="Work Request" cards={cardData2} />
      <NavBarSearchTooltipItem title="Work Plan" cards={cardData3} />
    </div>
  );
};

export default NavBarSearchTooltip;
