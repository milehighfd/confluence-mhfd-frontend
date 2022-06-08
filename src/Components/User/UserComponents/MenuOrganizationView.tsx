import React from 'react';
import { Menu, MenuProps } from 'antd';
import { User } from '../../../Classes/TypeList';
import { ORGANIZATION, CONSULTANT_CONTRACTOR } from '../../../constants/constants';

export default (values: User, setTitle: Function) => {
  const itemOrganization: any = [];
  const itemConsultant: any = [];
  ORGANIZATION.forEach((item: string, index: number) => {
    itemOrganization.push({
      key: `${index}|${item}`,
      label: <span>{item}</span>
    });
  });
  CONSULTANT_CONTRACTOR.forEach((item: string, index: number) => {
    itemConsultant.push({
      key: `${index}|${item}`,
      label: <span>{item}</span>
    });
  });
  const itemMenu: MenuProps['items'] = [
    {
      key: 'organization-items',
      type: 'group',
      label: <label className="label-sg">Local Government</label>,
      children: itemOrganization
    },
    {
      key: 'consultant-items',
      type: 'group',
      label: <label className="label-sg">Consultant/Contractor</label>,
      children: itemConsultant
    },
  ];
  return <Menu
    className="js-mm-00 sign-menu-organization"
    items={itemMenu}
    onClick={(event) => {
      values.organization = event.key.split('|')[1];
      setTitle(values.organization);
    }}>
  </Menu>
};
