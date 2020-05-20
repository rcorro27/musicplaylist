
import React, { Component } from 'react'
// import YouTube from 'react-youtube'

// import PlaylistSelect from 'component/playlistSelect-component'
import SearchInput from 'component/searchinput-component'
// import SearchResult from '../component/searchresult-component'

// import OptionComponent from 'component/option-component'
// import SearchResult from 'component/searchresult-component'

class MusicContainer extends Component {
    constructor (props) {
        super(props)

        this.state = {
            usertoken: 'BnDnaSzLcxIqiWtulAvPAqftHAvjTeuLzeiZsxsl',
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
        this.handleClickAlbumDetails = this.handleClickAlbumDetails.bind(this)

        this.parcoursResultsInfo = this.parcoursResultsInfo.bind(this)
        this.showAlbumInfo = this.showAlbumInfo.bind(this)
    }

    handleChange (event) {
        if (this.state.query !== '' || this.state.query === '') {
            this.setState({ query: event.target.value })
        }
    }

    handleClickAlbum (id, img) {
        const albumId = id
        const albumImg = img
        const Discogs = require('disconnect').Client
        const discogs = new Discogs({ userToken: this.state.usertoken }).database()
        discogs.getMaster(albumId)
            .then((infos) => {
                console.log(infos)
                let arrayInfosVideos = 0
                arrayInfosVideos = infos.videos.map((info, index) => [info.title, info.uri, albumImg, infos.genres[0], infos.year])
                console.log('array apres parcourir :', arrayInfosVideos)
                this.retourStateVideos(arrayInfosVideos)
            })
    }

    retourStateVideos (params) {
        this.setState({ infoVideos: params })
    }

    retourState (params) {
        this.setState({ results: params })
    }

    handleClick () {
        const query = this.state.query

        const Discogs = require('disconnect').Client

        const discogs = new Discogs({ userToken: this.state.usertoken }).database()
        discogs.search(query, { type: 'master', per_page: 50 }, (err, datas) => {
            let testArray = 0
            if (datas) {
                testArray = datas.results.map((info, index) => [info.title, info.id, info.thumb])
            } else {
                throw new Error(alert('Oups somenthing happend please reload the page', err))
            }
            this.retourState(testArray)
        })
    }

    handleClickAlbumDetails () {
        this.setState({ infoVideos: false })
    }

    parcoursResultsInfo () {
        let list = ''
        if (this.state.results !== '') {
            list = this.state.results.map((info, index) => <li className='list-group-item list-group-item-secondary' key={index} value={info[1]} onClick={() => this.handleClickAlbum(info[1], info[2])}><p>{info[0]}</p><img src={info[2]} /></li>)
        }
        return list
    }

    showAlbumInfo () {
        let infosAlbum = ''
        if (this.state.infoVideos !== '') {
            // info.title, info.uri, albumImg, infos.genres[0]
            infosAlbum = this.state.infoVideos.map((info, index) =>
                <div key={index + 1} className='albumInfo'>
                    <img src={info[2]} onClick={this.handleClickAlbumDetails} />
                    <li className='list-group-item list-group-item-secondary' key={index} value={info[1]}>
                        <p>Track :{info[0]}</p>
                        <p>Genre :{info[3]}</p>
                        <p>Year :{info[4]}</p>
                    </li>
                </div>)
        }
        return infosAlbum
    }

    render () {
        console.log(this.state.infoVideos)
        return (

            <div className='container'>
                <nav className='navbar navbar-expand-lg navbar-light text-light bg-dark'>
                    <a className='navbar-brand' href='#'>Music</a>

                    <SearchInput type='search' placeholder='search' className='form-control mr-sm-2' btnClass='btn btn-primary float-right' btnType='submit' onClick={this.handleClick} formClass='form-inline my-2 my-lg-0' onChange={this.handleChange} />

                </nav>
                <div>
                    {this.state.infoVideos ? <h3>Cliquez dans l'image pour retourner dans la recherche</h3> : <h3>Resultats de Recherche</h3>}

                </div>
                <div>
                    <ul className='list-group'>

                        {this.state.infoVideos ? this.showAlbumInfo() : this.parcoursResultsInfo()}
                    </ul>
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
