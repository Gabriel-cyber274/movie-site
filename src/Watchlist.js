import React, { Fragment } from 'react'
import film from './film.svg'
import './main.css'
import star from './star.svg'
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react';

function Watchlist() {
  const [add,watch_added] = useState(false)

  const remove = (n) => {
    let arr = JSON.parse(localStorage.watchlist)
    let index = arr.findIndex(item => item.Title === n)
    if(index !== -1) {
      arr.splice(index,1)
      localStorage.setItem('watchlist', JSON.stringify(arr))
    }

    watch_added(true)

    setTimeout(() => {
      watch_added(false)
    }, 1000);
  }

  let navigate = useNavigate()
  const play = (name) => {
    let path = '/youtube';
    navigate(path, {state:{movieN: name}})
  }


  if(localStorage.watchlist === '[]' || localStorage.watchlist === undefined){
    return (
      <>    
    <div className= {add?'show':'notificationC'}>
    <div className='notification'>
      <h4>No movies available</h4>
    </div>
    </div>
      <div className='top'>
          <h1>My Watchlist</h1>
          <Link to={"/"} ><button>Find your film</button></Link>
      </div>
      <div className='movie_display'>
      <div className='movie_icon'>
          <img src={film} alt='film' className='body_logo' />
          <h3>Start exploring</h3>
      </div>
      </div>
      </>
    )
  }
  else{
  return (
    <>
    <div className= {add?'show':'notificationC'}>
    <div className='notification'>
      <h4>1 movie removed from Watchlist</h4>
    </div>
    </div>
    <div className='top'>
        <h1>My Watchlist</h1>
        <Link to={"/"} ><button>Find your film</button></Link>
    </div>
    <div className='movie_display'>
      <div className='movies'>
      {JSON.parse(localStorage.watchlist).map((movie) => (
      <div key={movie.idN} className='movie_details'>
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
            <button onClick={() => remove(movie.Title)}>-</button>
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
    </>
  )
  }
}

export default Watchlist