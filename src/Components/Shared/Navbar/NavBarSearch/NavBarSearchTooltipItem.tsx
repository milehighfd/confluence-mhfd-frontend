import React from 'react';
import NavBarSearchTooltopCard from './NavBarSearchTooltopCard';
import { useHistory } from 'react-router-dom';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { useMapDispatch } from 'hook/mapHook';
import { WORK_PLAN, WORK_REQUEST } from 'constants/constants';
import { useProjectDispatch, useProjectState } from 'hook/projectHook';
import { useProfileDispatch } from 'hook/profileHook';
interface NavBarSearchTooltipCardProps {
    name: string;
    type: string;
    state: string;
    id: number;
    year?: number;
    locality?: string;
    projectType?: string;
    status?: number;
  }
const NavBarSearchTooltipItem = ({ title, cards, tabActiveSearch }: { title: string; cards: NavBarSearchTooltipCardProps[]; tabActiveSearch: string }) => {
  const history = useHistory();
  const { 
    setTabActiveNavbar 
  } =  useMapDispatch();
  const {
    setLocality,
    setTabKey,
    setYear,
    setLocalityFilter
  } = useRequestDispatch();
  const {
    setGlobalSearch,
    setGlobalProjectId,
    setGlobalStatusId
  } = useProjectDispatch();
  return (
    <div className="navbar-search-tooltip-item">
      {/* <h1>{title}</h1> */}
      {cards.map((card, index) => (
        <NavBarSearchTooltopCard
          key={index}
          name={card.name}
          type={card.type}
          state={card.state}
          onClick={() => {
            let type = 'PROJECT';
            switch (tabActiveSearch) {
              case 'Work Request':
                type = WORK_REQUEST;
                break;
              case 'Work Plan':
                type = WORK_PLAN;
                break;
            }
            if (type === WORK_REQUEST) {
              setGlobalSearch(true)
              setGlobalProjectId(card?.id || 0);
              setTabActiveNavbar(WORK_REQUEST);
              let projectType = '';
              if (card?.projectType === 'CIP') {
                projectType = 'Capital';
              }else{
                projectType = card?.projectType || '';
              }
              setYear(card?.year || 0);
              setLocality(card?.locality || '');
              setLocalityFilter(card?.locality || '');
              setTabKey(projectType);
              history.push({
                pathname: "map",
                search: `?year=${card?.year}&locality=${card?.locality}&tabKey=${projectType}`,
              });
            } else if (type === WORK_PLAN) {
              setGlobalSearch(true)
              setGlobalProjectId(card?.id || 0);
              setTabActiveNavbar(WORK_PLAN);
              let projectType = '';
              if (card?.projectType === 'CIP') {
                projectType = 'Capital';
              }else{
                projectType = card?.projectType || '';
              }
              setYear(card?.year || 0);
              setLocality(card?.locality || '');
              setLocalityFilter(card?.locality || '');
              setTabKey(projectType);
              history.push({
                pathname: "map",
                search: `?year=${card?.year}&locality=${card?.locality}&tabKey=${projectType}`,
              });
            } else{
              setGlobalSearch(true)
              setGlobalStatusId(card?.status || 0);
              setGlobalProjectId(card?.id || 0);
              history.push({
                pathname: "pm-tools"
              });
            }
          }}
        />
      ))}
    </div>
  );
};

export default NavBarSearchTooltipItem;
