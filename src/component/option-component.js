import React from 'react'

const OptionComponent = ({ label, value, index }) => (
    <option value={value} key={index}>{label}</option>

)
export default OptionComponent
