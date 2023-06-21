
import React from 'react'

function CheckBox(props) {
    const {value, onChange} = props
  return (
    <>
    <input type="checkbox" value={value} onChange={onChange} />
    </>
  )
}

export default CheckBox
