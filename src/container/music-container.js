// playlist select
// search input
// search result
import React, { Component } from 'react'
// import YouTube from 'react-youtube'
import * as countries from '../../all-countries-and-cities-json-master/countries.min.json'
import PlaylistSelect from 'component/playlistselect-component'
import SearchInput from 'component/searchinput-component'
import SearchResult from '../component/searchresult-component'

// import OptionComponent from 'component/option-component'
// import SearchResult from 'component/searchresult-component'

class MusicContainer extends Component {
    constructor (props) {
        super(props)

        this.state = {
            usertoken: 'BnDnaSzLcxIqiWtulAvPAqftHAvjTeuLzeiZsxsl',
            countries: countries.default,
            selectedCountry: '',
            results: '',
            query: '',
            options: {
                height: '390',
                width: '640',
                playerVars: {
                // https://developers.google.com/youtube/player_parameters
                    autoplay: 1
                }

            }
        }
        //  this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.retourState = this.retourState.bind(this)
        this.parcoursResultsInfo = this.parcoursResultsInfo.bind(this)
    }

    handleChange (event) {
        this.setState({ query: event.target.value })
    }

    retourState (params) {
        this.setState({ results: params })
    }

    parcoursResultsInfo () {
        if (this.state.results !== '') {
            return <option value={this.state.results.title} key={10}>{this.state.results}</option>
            // console.log('test', this.state.results[0])
            // return <YouTube videoId='-yHm_ChrTG0' opts={this.state.options} onReady={this.handleOnReady} />
            // this.state.results.map((info, index) => {
            // <SearchResult options={info} key={index} />
            // })
        }
    }

    handleClick () {
        alert('query : ' + this.state.query)
        const results = []
        const query = this.state.query
        const Discogs = require('disconnect').Client

        const discogs = new Discogs({ userToken: this.state.usertoken }).database()
        discogs.search(query, { type: 'master', per_page: 50 }, (err, datas) => {
            if (datas) {
                console.log(' data :', datas)
                datas.results.map((data) => discogs.getMaster(data.id)
                    .then(infos => {
                        results.push(infos)
                    }))
                this.retourState(results)
            } else {
                throw new Error('Oups somenthing happend please reload the page', err)
            }
        })
    }

    /* handleOnReady (event) {
        // access to player in all event handlers via event.target
         <YouTube videoId='-yHm_ChrTG0' opts={this.state.options} onReady={this.handleOnReady} />
        event.target.pauseVideo()
    } */

    render () {
        // console.log('Query : ', this.state.query)
        console.log('results apres requete', this.state.results)

        return (

            <div className='container'>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <a className='navbar-brand' href='#'>Navbar</a>
                    <PlaylistSelect text='Choose your playlist' id='playlist' name='playlist' value='playlist' options={this.state.countries.Afghanistan} onChange={this.handleCitiesChange} selectClass='form-control' />
                    <SearchInput type='search' placeholder='search' className='form-control mr-sm-2' btnClass='btn btn-outline-success my-2 my-sm-0' btnType='submit' onClick={this.handleClick} formClass='form-inline my-2 my-lg-0' onChange={this.handleChange} />

                </nav>
                {this.parcoursResultsInfo()}
                <div className='col form-group'>
                    <label htmlFor='country_id'>id</label>
                    <select className='custom-select' id='country_id' onChange={this.handleCountriesOnChange}>
                        {this.parcoursResultsInfo()}
                    </select>
                </div>
                <form>
                    <div className='row'>
                        <div className='col form-group' />
                        <div className='col form-group' />
                    </div>
                </form>

            </div>
        )
    }
}

export default MusicContainer
