import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import { RiHomeFill, RiAliensFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import './Footer.css';
import { GiPistolGun } from 'react-icons/gi'; // Import ikon senjata
import { IoIosAlbums } from "react-icons/io";

export default function Footer() {
    return (
        <footer>
            <div className="footer">
                <NavLink to="/teams" className="nav-link" activeClassName="active-link">
                    <RiHomeFill size="25px" />
                </NavLink>
                <NavLink to="/leaderboard" className="nav-link" activeClassName="active-link">
                    <FaTrophy size="25px" />
                </NavLink>
                <NavLink to="/skins" className="nav-link" activeClassName="active-link"> {/* New NavLink for Skins */}
                    <GiPistolGun size="25px" />
                </NavLink>
                <NavLink to="/stickers" className="nav-link" activeClassName="active-link">
                    <IoIosAlbums size="25px" />
                </NavLink>
                <NavLink to="/profile" className="nav-link" activeClassName="active-link">
                    <RiAliensFill size="25px" />
                </NavLink>
            </div>
        </footer>
    );
}