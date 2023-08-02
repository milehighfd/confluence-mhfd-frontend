import React from 'react';
import { Menu } from 'antd';


type Props = {
  setTypeAndSubType: (type: string, subType: string, label: string) => void;
};

export const TypeProjectsMenu: React.FC<Props> = ({ setTypeAndSubType }) => {
  return (
    <Menu
      className="menu-drop"
      items={[
        {
          key: 'Capital',
          label: 'Capital',
          onClick: () => {setTypeAndSubType('capital','','Capital')},
        },
        {
          key: 'Maintenance',
          label: 'Maintenance',
          children: [
            {
              key: 'Maintenance Restoration',
              label: 'Maintenance Restoration',
              onClick: () => {setTypeAndSubType('maintenance','Restoration','Maintenance Restoration')},
            },
            {
              key: 'Routine Trash & Debris',
              label: 'Routine Trash & Debris',
              onClick: () => {setTypeAndSubType('maintenance','Routine Trash and Debris','Routine Trash & Debris')},
            },
            {
              key: 'Sediment Removal',
              label: 'Sediment Removal',
              onClick: () => {setTypeAndSubType('maintenance','Sediment Removal','Sediment Removal')},
            },
            {
              key: 'General Maintenance',
              label: 'General Maintenance',
              onClick: () => {setTypeAndSubType('maintenance','Minor Repairs','General Maintenance')},
            },
            {
              key: 'Vegetation Management',
              label: 'Vegetation Management',
              onClick: () => {setTypeAndSubType('maintenance','Vegetation Management','Vegetation Management')},
            },
          ],
        },
        {
          key: 'Study',
          label: 'Study',
          onClick: () => {setTypeAndSubType('study','','Study')},
        },
        {
          key: 'Acquisition',
          label: 'Acquisition',
          onClick: () => {setTypeAndSubType('acquisition','','Acquisition')},
        },
        {
          key: 'R&D',
          label: 'R&D',
          onClick: () => {setTypeAndSubType('special','','R&D')},
        },
      ]}
    />
  );
};