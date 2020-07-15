/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import MovieTrailer from 'movie-trailer';
import axios from '../../axios';
import './Row.css';

const baseURL = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, containerID, largeRow }) {
    const [movies, setMovies] = useState([]);
    const [height, setHeight] = useState();
    const [width, setWidth] = useState();
    const [trailerURL, setTrailerURL] = useState();

    //UseEffect runs right after the component is called
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            const results = request.data.results;

            const arr = results.filter(filtered);
            function filtered(value) {
                if(value.backdrop_path !== null && value.poster_path !== null)
                    return value;
            }

            setMovies(arr);
        }

        function getWidth() {
            const width = screen.width
            if(width > 1000) {
                setHeight('400');
                setWidth(width - 500);
            } else {
                setHeight('100%');
                setWidth(width - 100);
            }
        }

        fetchData();
        getWidth();
    }, [fetchUrl]);

    const options = {
        height: height,
        width: '100%',
        playerVars: {
            autoplay: 1
        }
    };

    const handleClick = (movie) => {
        if(trailerURL) {
            setTrailerURL('');
        } else {
            MovieTrailer(movie?.title || movie?.name || movie?.original_name, (err, res) => {
                if(res) {
                    const URLParams = new URLSearchParams(new URL(res).search);
                    const URLId = URLParams.get('v');
                    setTrailerURL(URLId);
                }
            });
        }
    }
    const truncate = (str, n) => str?.length > n ? str.substr(0, n - 1) + "..." : str;
    const horizontalScroll = (len) => {
        var container = document.getElementById(containerID);
        container.scrollBy({
            left: len,
            behavior: 'smooth'
        });
    };
    const getYear = (date) => {
        var d = new Date(date);
        return d.getFullYear();
    };

    return (

        <div className="row">
            <h2 className="row__name" id={`name-${containerID}`}>{title}</h2>
            <div className="container" id={containerID}>
                <div className="arrow-left" onClick={() => horizontalScroll(-width)}>
                    <i className="far fa-angle-left"></i>
                </div>
                {movies.map(movie => (
                    <div className={`item ${largeRow && "largeRow"}`} key={movie.id} style={{
                        backgroundImage: `url(${baseURL}${largeRow ? movie.poster_path : movie.backdrop_path})`
                    }} onMouseOver={ largeRow && (e => { 
                        e.currentTarget.style.backgroundImage = `url(${baseURL}${movie.backdrop_path})`;
                        e.currentTarget.style.transition = '0.5s';
                    })} onMouseOut={ largeRow && (e => {
                        e.currentTarget.style.backgroundImage = `url(${baseURL}${movie.poster_path})`;
                        e.currentTarget.style.transition = '0.5s';
                    })}>
                        <div className="body-item">
                            <div className="body-item-1">
                                <div className="play" onClick={() => handleClick(movie)}>
                                    <i className="fas fa-play fa-fw"></i>
                                </div>
                            </div>
                            <div className="title body-item-2">{ movie?.title || movie?.name || movie?.original_name }</div>
                            <div className="properties body-item-3">
                                <span className="match">Rating: { movie?.vote_average }</span>
                                <span className="year">{ getYear(movie?.release_date || movie?.first_air_date) }</span>
                            </div>
                            <p className="description body-item-4">{ truncate(movie.overview, 140) }</p>
                            <div className="body-item-5">
                                <i className="details-icon fas fa-angle-down"></i>
                            </div>
                            <div className="icon-set body-item-6">
                                <i className="fas fa-thumbs-up"></i>
                                <i className="fas fa-thumbs-down"></i>
                                <i className="fas fa-plus"></i>
                            </div>
                        </div>
                    </div>
                ))};
                <div className="arrow-right" onClick={() => horizontalScroll(width)}>
                    <i className="far fa-angle-right"></i>
                </div>
            </div>
            { trailerURL && <YouTube videoId={trailerURL} opts={options} className="youtube__screen" /> }
        </div>
    );
}

export default Row;