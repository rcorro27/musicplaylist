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

            },
            test: '',
            infoVideos: ''

        }
        //  this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleClickAlbum = this.handleClickAlbum.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.retourState = this.retourState.bind(this)
        this.retourStateVideos = this.retourStateVideos.bind(this)

        this.parcoursResultsInfo = this.parcoursResultsInfo.bind(this)
    }

    handleChange (event) {
        this.setState({ query: event.target.value })
    }

    handleClickAlbum (id, img) {
        const albumId = id
        const albumImg = img

        const Discogs = require('disconnect').Client
        const discogs = new Discogs({ userToken: this.state.usertoken }).database()
        discogs.getMaster(id)
            .then((infos) => {
                console.log(infos)
                /*  let arrayInfosVideos = 0
                arrayInfosVideos = infos.videos.map((info, index) => [info.title, info.uri, albumImg])
                console.log('array apres parcourir :', arrayInfosVideos)
                this.retourStateVideos(arrayInfosVideos) */
            })

        alert(albumId)
        alert(albumImg)
    }

    retourStateVideos (params) {
        this.setState({ infoVideos: params })
    }

    retourState (params) {
        this.setState({ results: params })
    }

    handleClick () {
        alert('query : ' + this.state.query)
        // const results = []
        const query = this.state.query
        const Discogs = require('disconnect').Client

        const discogs = new Discogs({ userToken: this.state.usertoken }).database()
        discogs.search(query, { type: 'master', per_page: 50 }, (err, datas) => {
            let testArray = 0
            if (datas) {
                // console.log(' data :', datas)
                testArray = datas.results.map((info, index) => [info.title, info.id, info.thumb])
                // console.log(' test array :', testArray)
                //  this.retourState(datas)
                /* datas.results.map((data) => discogs.getMaster(data.id)
                    .then(infos => {
                        results.push(infos)
                    })) */
                // this.retourState(results)
            } else {
                throw new Error('Oups somenthing happend please reload the page', err)
            }
            this.retourState(testArray)
        })
    }

    parcoursResultsInfo () {
        let list = ''
        if (this.state.results !== '') {
            list = this.state.results.map((info, index) => <li key={index} value={info[1]} onClick={() => this.handleClickAlbum(info[1], info[2])}><p>{info[0]}</p><p>{info[1]}</p><img src={info[2]} /></li>)
        }
        return list
    }

    /* handleOnReady (event) {
        // access to player in all event handlers via event.target
         <YouTube videoId='-yHm_ChrTG0' opts={this.state.options} onReady={this.handleOnReady} />
        event.target.pauseVideo()
    } */

    render () {
        // console.log('Query : ', this.state.query)
        // console.log('test', this.state.test)

        console.log('results apres requete', this.state.results)
        console.log('test array ', this.state.test)
        console.log('info videos ', this.state.infoVideos)

        return (

            <div className='container'>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <a className='navbar-brand' href='#'>Navbar</a>
                    <PlaylistSelect text='Choose your playlist' id='playlist' name='playlist' value='playlist' options={this.state.countries.Afghanistan} onChange={this.handleCitiesChange} selectClass='form-control' />
                    <SearchInput type='search' placeholder='search' className='form-control mr-sm-2' btnClass='btn btn-outline-success my-2 my-sm-0' btnType='submit' onClick={this.handleClick} formClass='form-inline my-2 my-lg-0' onChange={this.handleChange} />

                </nav>
                <div>
                    <h2>infos:</h2>
                    <ul>
                        {this.parcoursResultsInfo()}
                    </ul>
                </div>
                <div className='col form-group'>
                    <label htmlFor='country_id'>id</label>
                    <select className='custom-select' id='country_id' onChange={this.handleCountriesOnChange} />
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
