import React from 'react'

const SearchResult = ({ options }) => (

    <div>
        <h2>{options.artists[0].name} </h2>
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
