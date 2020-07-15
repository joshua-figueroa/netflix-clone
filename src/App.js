import React from 'react';
import { Banner, Navbar, Row } from './components';
import request from './request';
import key from './key';
import './App.css';

function App() {
    return (
        <div className="app">
            <Navbar />
            <Banner />
            <Row title="NETFLIX ORIGINALS" fetchUrl={request.fetchNetflixOriginals} containerID={key.netflixOriginals} largeRow />
            <Row title="Trending Now" fetchUrl={request.fetchTrending} containerID={key.trending} />
            <Row title="New Releases" fetchUrl={request.fetchNewReleases} containerID={key.newReleases} />
            <Row title="Documentaries" fetchUrl={request.fetchDocumentaries} containerID={key.documentary} />
            <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} containerID={key.horror} />
            <Row title="Sci-Fi Movies" fetchUrl={request.fetchSciFiMovies} containerID={key.scifi} />
            <Row title="Adventure Movies" fetchUrl={request.fetchAdventureMovies} containerID={key.adventure} />
            <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies} containerID={key.romance} />
            <Row title="Drama Movies" fetchUrl={request.fetchDramaMovies} containerID={key.drama} />
            <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovies} containerID={key.comedy} />
            <Row title="Action Movies" fetchUrl={request.fetchActionMovies} containerID={key.action} />
        </div>
    );
}

export default App;