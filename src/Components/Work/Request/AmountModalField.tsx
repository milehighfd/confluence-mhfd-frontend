import { Button, InputNumber } from 'antd';
import React, { Fragment } from 'react';

const priceParser = (value: any) => {
  value = value.replace(/\$\s?|(,*)/g, '');
  if (value === '0') {
    return value;
  }
  while (value.length > 0 && value[0] === '0') {
    value = value.substr(1);
  }
  return value
}

const priceFormatter = (value: any) => {
  return `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const AmountModalField = ({
  label,
  isRequired,
  value,
  setter,
  disabled,
}: {
  label: string,
  isRequired: boolean,
  value: string | number | undefined,
  setter: (value: any) => void,
  disabled?: boolean,
}) => {

  return (
    <Fragment>
      <div style={{ display: 'flex', color: 'rgba(17, 9, 60, 0.5)' }}>
        {label}
        {/* {isRequired && <p style={{ color: 'red', whiteSpace: 'break-spaces' }}>{' *'}</p>} */}
      </div>
      <InputNumber min={0}
        formatter={priceFormatter}
        parser={priceParser}
        value={value} onChange={setter}
        disabled={disabled}
      />
      <Button className="button-close" disabled={disabled} onClick={() => setter(null)}>
        <img src="/Icons/icon-23.svg" alt='Clear' />
      </Button>
    </Fragment>
  );
}

export default AmountModalField;
