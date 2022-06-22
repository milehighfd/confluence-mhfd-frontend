import { Checkbox } from 'antd';
import React from 'react';

export const CheckBoxFilters = ({
  data, type, selected, onSelect, defaultValue,
}: any) => {
  return (
    <>
      {data && data.map((element: any) => (
        <>
          <Checkbox>
            {element.value}
          </Checkbox>
        </>
      ))}
    </>
  )
}