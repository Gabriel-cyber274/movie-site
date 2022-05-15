import React from 'react'
import { useLocation } from "react-router-dom"
import YouTube from "react-youtube"
import { useState } from 'react';
import movieTrailer from "movie-trailer";
import './youtube.css';
import { Link } from "react-router-dom" 

function Youtube() {
    const [trailerUrl, setURL] = useState('')
    const [err, youtube_err] = useState(false)
    let location = useLocation()


    const opts = {
        height: "390",
        width: "100%",
        playerVars : {
            autoplay: 1,
        }
    }

    console.log(location.state.movieN2)

    if (location.state.body) {
        movieTrailer(location.state?.movieN2 || "")
        .then(url => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setURL(urlParams.get('v'))
    })
    .catch((error) => 
        youtube_err("Unable to display youtube video. Please check your internet connection")
    )
    }
    else {
    movieTrailer(location.state?.movieN || "")
    .then(url => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setURL(urlParams.get('v'))
    })
    .catch(() => 
        youtube_err(true)
    )

    }

    const download=() => {
        window.open(`https://www.thenetnaija.com/search?t=${location.state.body?location.state.movieN2:location.state.movieN}`)
    }


  return (
    <div className='contain'>
    <h1>{location.state.body?location.state.movieN2:location.state.movieN}</h1>
    {err && <h3>Unable to display youtube video. Please check your internet connection</h3>}
    {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    <Link to={"/"} ><h4 style={{color:"blue",textAlign:"center",marginTop:"20px",fontSize:"1rem"}}>Search</h4></Link>
    {err?"":<h2 onClick={download} style={{color:"white",cursor:"pointer",textAlign:"center",marginTop:"20px",fontSize:"1rem"}}>Download</h2>}
    </div>
  )
}


export default Youtube