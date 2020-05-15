import React, { Component } from 'react'

import * as countries from '../../all-countries-and-cities-json-master/countries.min.json'
import OptionComponent from 'component/option-component'

class FormContainer extends Component {
    constructor (props) {
        super(props)

        this.state = {
            countries: countries.default,
            selectedCountry: '',
            weather: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCitiesChange = this.handleCitiesChange.bind(this)
    }

    handleChange (e) {
        // une fois que on a fait le set react prends en charge et on ne puex rien faire react va lancer le render
        this.setState({ selectedCountry: e.target.value })
    }

    handleCitiesChange (event) {
        console.log(event.target.value)
        const ville = event.target.value.replace(/ /gi, '+')
        const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + ville + '&APPID=52261c83c6e8a4c8e14e163120944701'

        fetch(url)
            .then(function (response) {
                return response.json()
            }).then(meteo => {
                const temp = JSON.stringify(Math.round(meteo.main.temp - 273, 15))
                this.setState({ weather: temp })
            })
            /*
            .then(function (myJson) {
                // MARTIN : PORQUOI SET STATE RESTE UNDEFINE ??
                const temp = JSON.stringify(Math.round(myJson.main.temp - 273, 15))
                console.log(temp)
                this.setState({ weather: temp })
                // console.log(JSON.stringify(myJson))
                // console.log(Math.round(myJson.main.temp - 273, 15))
            }) */
    }

    createCities () {
        if (this.state.selectedCountry !== '') {
            return this.state.countries[this.state.selectedCountry].map((cities, index) => <OptionComponent label={cities} value={cities} key={index} index={index} />)
        }
    }

    render () {
        /* console.log(this.state)
        console.log(this.handleClick) */
        console.log(this)
        console.log(this.state.selectedCountry)
        console.log(this.createCities)
        return (
            <div className='container'>

                <h1>Country / City</h1>

                <form>
                    <div className='row'>
                        <div className='col form-group'>
                            <label htmlFor='country_id'>Country</label>
                            <select className='custom-select' id='country_id' onChange={this.handleChange}>

                                {Object.keys(this.state.countries).map((country, index) => <OptionComponent label={country} value={country} key={index} index={index} />)}

                            </select>
                        </div>
                        <div className='col form-group'>
                            <label htmlFor='city_id'>City</label>

                            <select className='custom-select' id='city_id' onChange={this.handleCitiesChange}>
                                {this.createCities()}
                            </select>
                        </div>
                    </div>
                </form>

                <h1>openweathermap.org result</h1>

                <div>
                    <pre>
                        {this.state.weather} &#8451;
                    </pre>
                </div>
            </div>
        )
    }
}

export default FormContainer
