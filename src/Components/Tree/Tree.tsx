import React from 'react';

import {Branch} from './Branch';

export const Tree = ({ data } : any) => {
  return <div className='main-node'>
    {data.map((item: any) => <Branch key={item.id} item={item} level={0} />)}
  </div>
};