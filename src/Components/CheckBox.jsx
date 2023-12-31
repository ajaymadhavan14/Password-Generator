/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function CheckBox(props) {
  const { value, onChange } = props;
  return (
    <>
      <input
        type="checkbox"
        className="h-4 w-4"
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default CheckBox;
