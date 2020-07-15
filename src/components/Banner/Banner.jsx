/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import MovieTrailer from 'movie-trailer';
import axios from '../../axios';
import requests from '../../request';
import './Banner.css';

function Banner() {
    const [movie, setMovie] = useState([]);
    const [trailerURL, setTrailerURL] = useState();
    const [height, setHeight] = useState();

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            const random = Math.floor(Math.random() * request.data.results.length);

            setMovie(request.data.results[random]);

            return request;
        }

        setHeight(screen.width > 100 ? '400' : '100%');

        fetchData();
    }, []);

    const options = {
        height: height,
        width: '100%',
        playerVars: {
            autoplay: 1
        }
    };

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return(
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backgroundPosition: "center center"
        }}>

            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <h1 className="banner__description">{ truncate(movie?.overview, 280) }</h1>

                <div className="banner__buttons">
                    <button className="banner__button play" onClick={e => {

                        if(e.currentTarget.children[1].innerHTML === "Play") {
                            MovieTrailer(movie?.title || movie?.name || movie?.original_name, (err, res) => {
                                if(res) {
                                    const URLParams = new URLSearchParams(new URL(res).search);
                                    const URLId = URLParams.get('v');
                                    setTrailerURL(URLId);
                                }
                            });
                            e.currentTarget.children[0].className = "fas fa-pause";
                            e.currentTarget.children[1].innerHTML = "Pause"
                        } else {
                            setTrailerURL('');
                            e.currentTarget.children[0].className = "fas fa-play";
                            e.currentTarget.children[1].innerHTML = "Play";
                        }
                    }}><i className="fas fa-play"></i>&nbsp;&nbsp;<span>Play</span></button>
                    <button className="banner__button info"><i className="far fa-info-circle"></i>&nbsp;&nbsp;<span>My List</span></button>
                </div>
            </div>
            
            <div className="banner__fade"></div>
            { trailerURL && <YouTube videoId={trailerURL} opts={options} className="banner__trailer" /> }
            
        </header>
    );
}

export default Banner;