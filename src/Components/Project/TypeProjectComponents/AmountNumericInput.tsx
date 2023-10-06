import { Input } from "antd";
import React from "react";

const AmountNumericInput = (props: any) => {
    const { value, onChange } = props;
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = e.target;
      const currentValue = inputValue.replace(/,/g, '');
      const reg = /^-?\d*(\.\d*)?$/;
      if (reg.test(currentValue) || currentValue === '' || currentValue === '-') {
        const valueToChange = inputValue ? (+currentValue) : null;
        onChange(valueToChange);
      }
    };
  
    return (
        <Input
          {...props}
          className='input-amount'
          onChange={handleChange}
          allowClear
        />
    );
  };

  export default AmountNumericInput;