import React from 'react'

const SearchResult = ({ info1, key }) => (

    <div>
        {options.map((option, index) => <li key={index}>{option}</li>)}

    </div>
)
// {Object.keys(options).map((option, index) => <li value={option} key={index}>{option}</li>)}
/* <h3>{options.title}</h3>
        <img src={options.images[0].resource_url} />
        <ul>
            <li>Year : {options.year}</li>
            <li>Genre : {options.genres[0]}</li>
        </ul> */
export default SearchResult
