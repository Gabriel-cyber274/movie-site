import React, { Fragment } from 'react'
import film from './film.svg'
import './main.css'
import star from './star.svg'
import search from './search.svg'
import { useState } from 'react';
import axios from 'axios'
import Main from './Main';
import { useNavigate } from "react-router-dom"


function Body() {
  const [inputValue, input] = useState([]);
  const [display, displayMovies] = useState([])
  const [response, API_response] = useState(false)
  const [error, API_error] = useState(false)
  const [disable, disable_Search] = useState(false)
  const [add,watch_added] = useState(false)



  const getInput = (event) => {
  input(event.target.value)
  displayMovies([])
  API_response(false)
  disable_Search(false)
  API_error(false)
 }
  const searchApi = (event) => {
    event.preventDefault()
    async function fetch() {
      try{
      const getMovies = await axios.get(`https://www.omdbapi.com/?s=${inputValue}&apikey=658d14aa`)
      const first_movie = await axios.get(`https://www.omdbapi.com/?i=${getMovies.data.Search[0].imdbID}&apikey=658d14aa`);
      const second_movie = await axios.get(`https://www.omdbapi.com/?i=${getMovies.data.Search[1].imdbID}&apikey=658d14aa`);
      const third_movie = await axios.get(`https://www.omdbapi.com/?i=${getMovies.data.Search[2].imdbID}&apikey=658d14aa`);
      const fourth_movie = await axios.get(`https://www.omdbapi.com/?i=${getMovies.data.Search[3].imdbID}&apikey=658d14aa`);
      const fifth_movie = await axios.get(`https://www.omdbapi.com/?i=${getMovies.data.Search[4].imdbID}&apikey=658d14aa`);
      const sixth_movie = await axios.get(`https://www.omdbapi.com/?i=${getMovies.data.Search[5].imdbID}&apikey=658d14aa`);
      const seventh_movie = await axios.get(`https://www.omdbapi.com/?i=${getMovies.data.Search[6].imdbID}&apikey=658d14aa`);
      const eighth_movie = await axios.get(`https://www.omdbapi.com/?i=${getMovies.data.Search[7].imdbID}&apikey=658d14aa`);
      const nineth_movie = await axios.get(`https://www.omdbapi.com/?i=${getMovies.data.Search[8].imdbID}&apikey=658d14aa`);
      const tenth_movie = await axios.get(`https://www.omdbapi.com/?i=${getMovies.data.Search[9].imdbID}&apikey=658d14aa`);

      displayMovies([...display, first_movie.data,second_movie.data,third_movie.data,fourth_movie.data,fifth_movie.data,sixth_movie.data,seventh_movie.data,eighth_movie.data,nineth_movie.data,tenth_movie.data])
      if(getMovies.status === 200) {
        API_response(true)
      }

    }
      catch(e){
        API_error(true)
      }

    }
    fetch()

    disable_Search(true)

  }

  

  localStorage.setItem('idC', 0)
  const Watchlist = (id,e) => {
    async function watchList() {
      const watch = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=658d14aa`)

      e.target.disabled = true;

      localStorage.idC++


      if(localStorage.getItem('id') === null){
        localStorage.setItem('id', '[]')
      }
      let watchID = JSON.parse(localStorage.getItem('id')) 
      watchID.push(localStorage.idC)

      localStorage.setItem('id', JSON.stringify(watchID))

      
      if(localStorage.id === undefined){
        console.log('')
      }else {
      JSON.parse(localStorage.id).map(m=> {
      watch.data['idN'] = m
      })
    }

      if(localStorage.getItem('watchlist') === null){
        localStorage.setItem('watchlist', '[]')
      }
      let watchD = JSON.parse(localStorage.getItem('watchlist')) 
      watchD.push(watch.data)

      localStorage.setItem('watchlist', JSON.stringify(watchD))
      watch_added(true)

      setTimeout(() => {
        watch_added(false)
      }, 800);
    }
    watchList()
  }


  if(localStorage.id === undefined){
    console.log('')
  }else{
    let idB = JSON.parse(localStorage.id);
    localStorage.setItem('idC', idB[idB.length-1])
  }

  
  let navigate = useNavigate()
  const play = (name) => {
    let path = '/youtube';
    navigate(path, {state:{movieN2: name, body: true}})
  }
  


  return (
    <Fragment>
      <Main watch={add} />
    <form onSubmit={searchApi}>
        <img src={search} alt='search' className='search_icon' /><input type='text' placeholder='Search for a movie' className='searchInput' onChange={getInput} required />
        <input type='submit' value='Search' className='search' disabled={disable?true:false} />
    </form>
    <div className='movie_display'>
      <div className={response?'none':'movie_icon'}>
          <img src={film} alt='film' className={error?'none':'body_logo'} style={{background: localStorage.dark === 'true'?"grey":"white"}} />
          <h3>{error?"Unable to find what you're looking for. Please try another search":'Start exploring'}</h3>
      </div>
      <div className='movies'>
      {display.map((movie) => (
      <div key={movie.imdbID} className='movie_details' >
          <img src={movie.Poster} alt='No image' className='image' onClick={()=> play(movie.Title)} />
        <div className='rate'>
          <div className='rating'>
            <h1 onClick={()=> play(movie.Title)}>{movie.Title}</h1>
            <div className='rated'>
            <img src={star} alt='rating' />
            <h5>{movie.imdbRating}</h5>
            </div>
          </div>
          <div className='time'>
            <h3 className='movie_mins'>{movie.Runtime}</h3>
            <h3 className='movie_type'>{movie.Genre}</h3>
            <div className='watch'>
            <button onClick={(e) => Watchlist(movie.imdbID,e)} >+</button>
            <h3>Watchlist</h3>
            </div>
          </div>
          <div className='details'>
            <p>{movie.Plot}</p>
          </div>
        </div>
        </div>
    ))}
      </div>
    </div>
    <div>

    </div>
    </Fragment>
  )
}

export default Body