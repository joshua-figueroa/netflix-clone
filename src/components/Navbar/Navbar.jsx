/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 20) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll");
        }
    }, [])

    return (
        <nav className={`navbar ${show && "navbar__dark"}`}>
            <div className="navbar__contents" role="navigation">
                <a href="/" className="navbar__brand">
                    <img className="navbar__logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png" 
                        alt="Netflix Logo" 
                    />
                </a>

                <div className="navbar__navigation">
                    <ul className="primary__nav">
                        <li className="navigation__tab">
                            <a href="#" className="active">Home</a>
                        </li>
                        <li className="navigation__tab">
                            <a href="#">TV Shows</a>
                        </li>
                        <li className="navigation__tab">
                            <a href="#">Movies</a>
                        </li>
                        <li className="navigation__tab">
                            <a href="#">Latest</a>
                        </li>
                        <li className="navigation__tab">
                            <a href="#">My List</a>
                        </li>
                    </ul>
                </div>

                <div className="navbar__secondary__nav">
                    <img className="navbar__avatar"
                        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" 
                        alt="Netflix Avatar" 
                    />
                </div>

            </div>
        </nav>
    );
}

export default Navbar;