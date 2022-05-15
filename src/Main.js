import React, { useState } from 'react'
import './main.css'
import { Link } from "react-router-dom" 

function Main({ watch }) {
  return (
    <>
    <div className= {watch?'show':'notificationC'}>
    <div className='notification'>
      <h4>1 movie added to Watchlist</h4>
    </div>
    </div>
    <div className='top'>
        <h1>Find your film</h1>
        <Link to={"/watchlist"} ><button>My Watchlist</button></Link>
    </div>
    </>
  )
}

export default Main