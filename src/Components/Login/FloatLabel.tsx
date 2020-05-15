import React, { useState } from "react";

const FloatLabel = (props:any) => {
  const [focus, setFocus] = useState(false);
  const { children, label, value } = props;

  const labelClass =
    focus || value !== 0 ? "label label-float" : "label";

  return (
    <div
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <label className={labelClass}>{label}</label>
    </div>
  );
};

export default FloatLabel;
