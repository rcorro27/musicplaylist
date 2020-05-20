import React, { Component } from 'react'

class DetailsContainer extends Component {
    constructor (props) {
        super(props)

        this.state = {
            countries: countries.default,
            selectedCountry: '',
            weather: ''
        }

        this.handleCountriesOnChange = this.handleCountriesOnChange.bind(this)
        this.handleCitiesOnChange = this.handleCitiesOnChange.bind(this)
    }

    handleCountriesOnChange (event) {
        this.setState({
            selectedCountry: event.target.value
        })
    }

    render () {
        return (
            <div className='container'>

                <h1>Country / City</h1>

                <form>
                    <div className='row' />
                </form>

                <h1>openweathermap.org result</h1>

            </div>
        )
    }
}

export default DetailsContainer
