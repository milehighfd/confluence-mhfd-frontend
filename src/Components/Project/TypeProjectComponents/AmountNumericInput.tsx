import { Input } from "antd";
import React from "react";

const AmountNumericInput = (props: any) => {
    const { value, onChange } = props;
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = e.target;
      const reg = /^-?\d*(\.\d*)?$/;
      if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
        const valueToChange = inputValue ? (+inputValue) : null;
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