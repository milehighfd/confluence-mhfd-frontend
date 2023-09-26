import React from 'react';
import { Menu } from 'antd';


type Props = {
  setTypeAndSubType: (type: string, subType: string, label: string) => void;
};

export const TypeProjectsMenu: React.FC<Props> = ({ setTypeAndSubType }) => {
  return (
    <Menu
      className="menu-drop menu-drop-type"
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
              key: 'Routine Trash & Debris',
              label: 'Routine Trash and Debris',
              onClick: () => {setTypeAndSubType('maintenance','Routine Trash and Debris','Routine Trash and Debris')},
            },
            {
              key: 'Vegetation Management',
              label: 'Vegetation Management',
              onClick: () => {setTypeAndSubType('maintenance','Vegetation Management','Vegetation Management')},
            },
            {
              key: 'Sediment Removal',
              label: 'Sediment Removal',
              onClick: () => {setTypeAndSubType('maintenance','Sediment Removal','Sediment Removal')},
            },
            {
              key: 'General Maintenance',
              label: 'Minor Repair',
              onClick: () => {setTypeAndSubType('maintenance','Minor Repair','Minor Repair')},
            },
            {
              key: 'Maintenance Restoration',
              label: 'Restoration',
              onClick: () => {setTypeAndSubType('maintenance','Restoration','Restoration')},
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
          onClick: () => {setTypeAndSubType('r&d','','R&D')},
        },
      ]}
    />
  );
};