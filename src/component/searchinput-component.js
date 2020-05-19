
import React from 'react'

const SearchInput = ({ type, placeholder, className, btnClass, btnType, onSubmit, formClass, onChange, onClick }) => (
    // <form className={formClass} onSubmit={onSubmit}>
    <div>
        <input className={className} type={type} placeholder={placeholder} onChange={onChange} />
        <button className={btnClass} type={btnType} onClick={onClick}>Search</button>
    </div>
)

export default SearchInput
