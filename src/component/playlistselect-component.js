import React from 'react'

const PlaylistSelect = ({ text, id, name, value, options, onChange, selectClass }) => (
    <div>
        <label htmlFor={id}>{text}</label>
        <select name={name} value={value} id={id} onChange={onChange} className={selectClass}>
            {options.map((option, index) => <option value={option.value} key={index}>{option}</option>)}
        </select>
    </div>
)

export default PlaylistSelect
