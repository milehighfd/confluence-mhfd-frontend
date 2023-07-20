import { Menu } from "antd";
import React from "react";

const TypeProjectsFilter = () => {
  return(
    <Menu
      className="menu-drop"
      items={[
        {
          key: 'Capital',
          label: 'Capital',
        },
        {
          key: 'Maintenance',
          label: 'Maintenance',
          children: [
            {
              key: 'Maintenance Restoration',
              label: 'Maintenance Restoration',
            },
            {
              key: 'Routine Trash & Debris',
              label: 'Routine Trash & Debris',
            },
            {
              key: 'Sediment Removal',
              label: 'Sediment Removal',
            },
            {
              key: 'General Maintenance',
              label: 'General Maintenance',
            },
            {
              key: 'Vegetation Management',
              label: 'Vegetation Management',
            },
          ],
        },
        {
          key: 'Study',
          label: 'Study',
        },
        {
          key: 'Acquisition',
          label: 'Acquisition',
        },
        {
          key: 'R&D',
          label: 'R&D',
        },
    ]}/>
  )
};

export default TypeProjectsFilter;